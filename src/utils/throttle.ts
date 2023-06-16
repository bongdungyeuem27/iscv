export function throttle(fn: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let lastCallTime = 0

  return function (...args: any[]) {
    const now = Date.now()

    if (now - lastCallTime >= delay) {
      // @ts-ignore
      fn.apply(this, args)
      lastCallTime = now
    }
  }
}
