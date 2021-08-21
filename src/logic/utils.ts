export const removeDuplicateElements = <T>(array: Array<T>) => {
  return array.filter((data, index) => array.indexOf(data) === index)
}

export const getDefaultVariants = (delay: number) => ({
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * delay },
  }),
  hidden: { opacity: 0, y: -10 },
})

export const isDevelopment = () =>
  process && process.env.NODE_ENV === 'development'

export const postAnalytics = (path: string) => {
  const analyticsEndpoint =
    'https://awesome-notion-analytics.mnist.repl.co/analytic'
  if (!isDevelopment()) {
    fetch(`${analyticsEndpoint}?path=${path}`, { method: 'POST' })
  }
}
