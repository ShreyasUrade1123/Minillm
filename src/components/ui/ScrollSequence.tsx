import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface ScrollSequenceProps {
  /** The total number of frames in the sequence. */
  frameCount: number
  /** The starting frame index (0-indexed). Defaults to 0. */
  startFrame?: number
  /** Function to generate the image URL based on the frame index (1-indexed). */
  frameUrlGen: (index: number) => string
  /** The aspect ratio of the frames (e.g., 16/9). Defaults to 16/9. */
  aspectRatio?: number
  /** Additional classes for the wrapper. */
  className?: string
  /** Classes for the sticky container. */
  stickyClassName?: string
  /** Content to display over the sequence, which will fade out on scroll. */
  children?: React.ReactNode
  /** Content to display over the sequence, which will fade in at the end of scroll. */
  endChildren?: React.ReactNode
  /** The progress value (0.0 to 1.0) where the frame sequence ends. Defaults to 1.0. */
  sequenceEndProgress?: number
  /** Callback fired with the raw scroll progress on every frame. */
  onProgress?: (progress: number) => void
  /** A piecewise mapping of [scrollProgress, targetFrameIndex] to control the timeline explicitly. */
  timeline?: [number, number][]
}

export function ScrollSequence({
  frameCount,
  startFrame = 0,
  frameUrlGen,
  aspectRatio = 16 / 9,
  className,
  stickyClassName,
  children,
  endChildren,
  sequenceEndProgress = 1.0,
  onProgress,
  timeline,
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const endOverlayRef = useRef<HTMLDivElement>(null)

  // State for loaded images to ensure we don't try to draw unloaded frames
  const [images] = useState<HTMLImageElement[]>([])
  const [loadedCount, setLoadedCount] = useState(0)

  // Current target and actual (interpolated) frame indices
  const scrollTarget = useRef(startFrame)
  const renderIndex = useRef(startFrame)
  const animationFrameId = useRef<number>()

  // 1. Preload all images
  useEffect(() => {
    let loaded = 0
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      img.src = frameUrlGen(i)
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
      }
      img.onerror = () => {
        loaded++
        setLoadedCount(loaded)
        console.warn(`Frame failed to load: ${img.src}`)
      }
      images[i - 1] = img
    }
  }, [frameCount, frameUrlGen, images])

  // 2. Handle Resize and initial drawing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Use the window dimensions or a parent container for the base
      const dpr = window.devicePixelRatio || 1
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight

      // Calculate "cover" dimensions keeping the aspect ratio
      const winRatio = winWidth / winHeight
      let renderWidth = winWidth
      let renderHeight = winHeight

      if (winRatio < aspectRatio) {
        // Window is narrower than the frame -> scale to height
        renderHeight = winHeight
        renderWidth = winHeight * aspectRatio
      } else {
        // Window is wider than the frame -> scale to width
        renderWidth = winWidth
        renderHeight = winWidth / aspectRatio
      }

      // Remove zoom factor to increase width back to full cover size
      const zoomFactor = 1.0
      renderWidth *= zoomFactor
      renderHeight *= zoomFactor

      // Set actual canvas size matching screen pixels for sharpness
      canvas.width = winWidth * dpr
      canvas.height = winHeight * dpr

      // Set CSS size
      canvas.style.width = `${winWidth}px`
      canvas.style.height = `${winHeight}px`

      // Scale the context to account for DPR
      ctx.scale(dpr, dpr)

      // Store the render dimensions globally on the canvas dataset for the render loop to use
      canvas.dataset.renderWidth = renderWidth.toString()
      canvas.dataset.renderHeight = renderHeight.toString()
      canvas.dataset.offsetX = '0' // Align to the left edge
      canvas.dataset.offsetY = ((winHeight - renderHeight) / 2).toString()

      // Force a redraw of the current frame on resize
      drawFrame(Math.floor(renderIndex.current))
    }

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const image = images[index]
      if (image && image.complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

        // Draw image covering the entire area (centered)
        const renderWidth = parseFloat(canvas.dataset.renderWidth || '0')
        const renderHeight = parseFloat(canvas.dataset.renderHeight || '0')
        const offsetX = parseFloat(canvas.dataset.offsetX || '0')
        const offsetY = parseFloat(canvas.dataset.offsetY || '0')

        ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight)
      }
    }

    // 3. Render Loop with requestAnimationFrame for silky smooth LERP
    const renderLoop = () => {
      // Linear interpolation for smoothness (ease out)
      const diff = scrollTarget.current - renderIndex.current
      renderIndex.current += diff * 0.1 // The easing factor (0.1 = smooth, 1 = instant)

      // If the difference is extremely small, snap to the target to avoid endless micro-calculations
      if (Math.abs(diff) < 0.001) {
        renderIndex.current = scrollTarget.current
      }

      const frameToDraw = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(renderIndex.current))
      )

      drawFrame(frameToDraw)
      animationFrameId.current = requestAnimationFrame(renderLoop)
    }

    // Initialize
    handleResize()
    window.addEventListener('resize', handleResize)
    animationFrameId.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [aspectRatio, images, frameCount])

  // 4. Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      // Calculate how far we've scrolled within the container
      const rect = containerRef.current.getBoundingClientRect()

      // Calculate scroll progress (0.0 to 1.0)
      // The start is when the top of the container hits the top of the viewport
      // The end is when the bottom of the container hits the bottom of the viewport
      const scrollY = -rect.top
      const maxScroll = rect.height - window.innerHeight

      let progress = scrollY / maxScroll
      progress = Math.max(0, Math.min(1, progress)) // Clamp between 0 and 1

      let frameTarget = startFrame

      if (timeline && timeline.length > 0) {
        // Find the segment where progress falls
        for (let i = 0; i < timeline.length - 1; i++) {
          const [p1, f1] = timeline[i]
          const [p2, f2] = timeline[i + 1]
          if (progress >= p1 && progress <= p2) {
            // Avoid division by zero
            if (p2 === p1) {
              frameTarget = f2
            } else {
              const segmentProgress = (progress - p1) / (p2 - p1)
              frameTarget = f1 + segmentProgress * (f2 - f1)
            }
            break
          }
        }
        
        // Handle edges explicitly
        if (progress <= timeline[0][0]) frameTarget = timeline[0][1]
        if (progress >= timeline[timeline.length - 1][0]) frameTarget = timeline[timeline.length - 1][1]
      } else {
        // Fallback to simple linear sequenceProgress
        const sequenceProgress = Math.min(1, Math.max(0, progress / sequenceEndProgress))
        frameTarget = startFrame + sequenceProgress * (frameCount - 1 - startFrame)
      }

      scrollTarget.current = frameTarget

      if (onProgress) {
        onProgress(progress)
      }

      // Fade out start overlay during the first 10% of scroll
      if (overlayRef.current) {
        const opacity = Math.max(0, 1 - progress * 10)
        overlayRef.current.style.opacity = opacity.toString()
        overlayRef.current.style.pointerEvents = opacity > 0 ? 'auto' : 'none'
      }

      // Fade in end overlay (default behavior if no custom onProgress logic overrides it)
      if (endOverlayRef.current && !onProgress) {
        const opacity = Math.max(0, (progress - 0.85) * (1 / 0.15))
        endOverlayRef.current.style.opacity = opacity.toString()
        endOverlayRef.current.style.pointerEvents = opacity > 0 ? 'auto' : 'none'
      }
    }

    // Passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial call to set correct frame on mount/refresh
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [frameCount])

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div
        className={cn(
          'sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#F7F2E4]',
          stickyClassName,
        )}
      >
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 block h-full w-full"
        />

        {/* Overlay Content */}
        {children && (
          <div
            ref={overlayRef}
            className="absolute inset-0 z-20 flex"
          >
            {children}
          </div>
        )}

        {/* End Overlay Content */}
        {endChildren && (
          <div
            ref={endOverlayRef}
            className="absolute inset-0 z-30"
            style={{ opacity: onProgress ? 1 : 0 }}
          >
            {endChildren}
          </div>
        )}

        {/* Loading overlay for slow networks */}
        {loadedCount < frameCount && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F7F2E4] z-10 transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4">
              <div className="h-2 w-48 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full bg-primary-500 transition-all duration-300"
                  style={{ width: `${(loadedCount / frameCount) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-neutral-400">
                Loading Animation {Math.round((loadedCount / frameCount) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
