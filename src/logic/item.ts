import { removeDuplicateElements } from './utils'
import categoriesData from '../store/categories.json'

export interface Content {
  id: string
  Title: string
  Type: string
  Description: string
  Link: string
  Category: string
  Tags: Array<string>
}

export interface Category {
  id: string
  Name: string
  Description: string
}

const WORKER_ENDPOINT = process.env.WORKER_ENDPOINT
const isDevelopment = process.env.NODE_ENV === 'development'

// dynamic import mocks data
const getItemsMock = () =>
  import('@/mocks/items.json').then((module) => module.default)

export const getItems = async (category?: string) => {
  let contents: Array<Content>
  // If in dev environment, fetching data from mocks will be faster
  if (isDevelopment) {
    contents = await getItemsMock()
  } else {
    const res = await fetch(
      `${WORKER_ENDPOINT}/v1/table/82de766385fc439fbb010d9cf01e075b`
    )
    contents = await res.json()
  }
  if (category)
    return contents.filter((content) => content.Category === category)
  return contents
}

export const getItemsByTag = async (tag: string) => {
  const items = await getItems()
  // lowercase tags before match
  return items.filter((item) =>
    item.Tags.map((tag) => tag.toLowerCase()).includes(tag)
  )
}

export const getCategories = () => {
  const categories: Array<Category> = categoriesData
  return categories
}

export const getTags = async () => {
  const items = await getItems()
  const tags = removeDuplicateElements(items.map((item) => item.Tags).flat())
  return tags
}

export const getCategoriesName = async () => {
  const categories = await getCategories()
  return categories.map((category) => category.Name)
}
