export const removeDuplicateElements = <T>(array: Array<T>) => {
  return array.filter((data, index) => array.indexOf(data) === index)
}

export const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const getDefaultVariants = (delay: number) => ({
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * delay },
  }),
  hidden: { opacity: 0, y: -10 },
})
