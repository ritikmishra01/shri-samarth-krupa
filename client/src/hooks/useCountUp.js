import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * useCountUp — animates a number from 0 to `end` over `duration` ms.
 * Starts when the element is in the viewport.
 */
export function useCountUp(end, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const startTime = performance.now()
    const startValue = 0

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (end - startValue) * eased)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, end, duration])

  return { count, ref, displayValue: `${count}${suffix}` }
}

export default useCountUp
