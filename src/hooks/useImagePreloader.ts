import { useState, useEffect } from 'react'

export function useImagePreloader(totalFrames: number, frameUrlGen: (index: number) => string) {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    let loadedCount = 0

    const loadImages = async () => {
      const urls: string[] = []
      // 1-indexed to match frame sequence
      for (let i = 1; i <= totalFrames; i++) {
        urls.push(frameUrlGen(i))
      }

      // Load in batches to prevent network stalling and ensure accurate progress
      const batchSize = 25
      for (let i = 0; i < urls.length; i += batchSize) {
        if (!isMounted) return
        
        const batch = urls.slice(i, i + batchSize)
        const promises = batch.map((url) => {
          return new Promise<void>((resolve) => {
            const img = new Image()
            const handleFinish = () => {
              loadedCount++
              if (isMounted) setProgress(Math.floor((loadedCount / totalFrames) * 100))
              resolve()
            }
            img.onload = handleFinish
            img.onerror = handleFinish // count as processed even on error
            img.src = url
          })
        })
        
        await Promise.all(promises)
      }
      
      if (isMounted) {
        setProgress(100)
        // Short artificial delay before unmounting for smooth UX
        setTimeout(() => {
          if (isMounted) setIsLoaded(true)
        }, 600)
      }
    }

    loadImages()

    return () => {
      isMounted = false
    }
  }, [totalFrames, frameUrlGen])

  return { progress, isLoaded }
}
