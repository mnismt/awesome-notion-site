export interface Content {
  id: string
  Title: string
  Description: string
  Link: string
  Category: string
  Tags: Array<string>
}

export const getItems = async (category?: string) => {
  const res = await fetch(
    'https://notion-mnismt-worker.viplovetop.workers.dev/v1/table/82de766385fc439fbb010d9cf01e075b'
  )
  const contents: Array<Content> = await res.json()
  if (category)
    return contents.filter((content) => content.Category === category)
  return contents
}

export const getCategories = async () => {
  const contents = await getItems()
  const categories = contents.map((content) => content.Category)
  // filter duplicate category
  return categories.filter(
    (category, index) => categories.indexOf(category) === index
  )
}
