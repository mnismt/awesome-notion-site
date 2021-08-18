export const removeDuplicateElements = <T>(array: Array<T>) => {
  return array.filter((data, index) => array.indexOf(data) === index)
}

export const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)
