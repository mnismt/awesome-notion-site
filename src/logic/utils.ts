export const removeDuplicateElements = <T>(array: Array<T>) => {
  return array.filter((data, index) => array.indexOf(data) === index)
}
