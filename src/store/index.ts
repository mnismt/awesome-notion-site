import create, { GetState, SetState } from 'zustand'
import categories from './categories.json'

export interface Category {
  id: string
  name: string
  description: string
  active: boolean
}

interface ConfigStore {
  categories: Array<Category>
  setCategories(categories: Array<Category>): void
  activeCategory(index: number): void
  getCurrentActiveCategory(): Category
  activeAllCategories(): void
}

export const useConfigStore = create<ConfigStore>(
  (set: SetState<ConfigStore>, get: GetState<ConfigStore>) => ({
    categories: [],
    setCategories(categories) {
      set({ categories })
    },
    activeCategory(index) {
      const categories = get().categories
      set({
        categories: categories.map((category, categoryIndex) => ({
          ...category,
          active: index === categoryIndex,
        })),
      })
    },
    getCurrentActiveCategory() {
      const categories = get().categories
      return categories.filter((category) => category.active)[0]
    },
    activeAllCategories() {
      const categories = get().categories.map((category) => ({
        ...category,
        active: true,
      }))
      set({ categories })
    },
  })
)

useConfigStore.setState({
  categories: categories.map((category) => ({
    id: category.id,
    name: category.Name,
    description: category.Description,
    active: false,
  })),
})
