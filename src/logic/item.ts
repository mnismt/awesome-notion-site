import { removeDuplicateElements } from './utils'

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
  Color: string
}

const WORKER_ENDPOINT = process.env.WORKER_ENDPOINT

export const getItems = async (category?: string) => {
  const res = await fetch(
    `${WORKER_ENDPOINT}/v1/table/82de766385fc439fbb010d9cf01e075b`
  )
  const contents: Array<Content> = await res.json()
  if (category)
    return contents.filter((content) => content.Category === category)
  return contents
}

export const getItemsByTag = async (tag: string) => {
  const items = await getItems()
  return items.filter((item) => item.Tags.includes(tag))
}

export const getCategories = async () => {
  const res = await fetch(
    `${WORKER_ENDPOINT}/v1/table/34f183ab86394feb84e3db5e7714db80`
  )
  const categories: Array<Category> = await res.json()
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
