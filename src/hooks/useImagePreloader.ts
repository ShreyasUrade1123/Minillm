import { useState, useEffect } from 'react'

export function useImagePreloader(
  totalFrames: number, 
  frameUrlGen: (index: number) => string,
  framesToUnlock: number = totalFrames
) {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    let loadedCount = 0
    let hasUnlocked = false

    const loadImages = async () => {
      const urls: string[] = []
      // 1-indexed to match frame sequence
      for (let i = 1; i <= totalFrames; i++) {
        urls.push(frameUrlGen(i))
      }

      // Load in larger batches for faster network utilization
      const batchSize = 40
      for (let i = 0; i < urls.length; i += batchSize) {
        if (!isMounted) return
        
        const batch = urls.slice(i, i + batchSize)
        const promises = batch.map((url) => {
          return new Promise<void>((resolve) => {
            const img = new Image()
            const handleFinish = () => {
              loadedCount++
              
              if (isMounted && !hasUnlocked) {
                const currentProgress = Math.floor((loadedCount / framesToUnlock) * 100)
                if (currentProgress >= 100) {
                  hasUnlocked = true
                  setProgress(100)
                  setTimeout(() => {
                    if (isMounted) setIsLoaded(true)
                  }, 400)
                } else {
                  setProgress(currentProgress)
                }
              }
              resolve()
            }
            img.onload = handleFinish
            img.onerror = handleFinish // count as processed even on error
            img.src = url
          })
        })
        
        await Promise.all(promises)
      }
      
      if (isMounted && !hasUnlocked) {
        setProgress(100)
        setTimeout(() => {
          if (isMounted) setIsLoaded(true)
        }, 400)
      }
    }

    loadImages()

    return () => {
      isMounted = false
    }
  }, [totalFrames, frameUrlGen, framesToUnlock])

  return { progress, isLoaded }
}
