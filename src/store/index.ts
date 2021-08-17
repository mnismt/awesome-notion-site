import create, { GetState, SetState } from 'zustand'

export interface Category {
  id: string
  name: string
  description: string
  active: boolean
}

const defaultConfig: Array<Category> = [
  {
    id: '0e399e46-edb0-4ad7-a318-b63d0cecd8dd',
    name: 'Websites',
    description: '',
    active: false,
  },
  {
    id: 'aa01407b-f773-4a6e-a84f-08c5cd34ef77',
    name: 'Resources',
    description: '',
    active: false,
  },
  {
    id: '8c3cbce6-bc71-4283-b4c3-8afc8214ec1c',
    name: 'CMS',
    description: '',
    active: false,
  },
  {
    id: '9c65e653-6e7d-437e-9767-b4a8ed8f9b07',
    name: 'Tools',
    description: '',
    active: false,
  },
  {
    id: 'f48533da-d1f0-4023-9908-0861387edff8',
    name: 'Dev',
    description: '',
    active: false,
  },
  {
    id: '76dc85cd-452a-4c8a-a0d5-ddaf04b6aa32',
    name: 'Communities',
    description: '',
    active: false,
  },
]

interface ConfigStore {
  categories: Array<Category>
  setCategories(categories: Array<Category>): void
  activeCategory(index: number): void
  getCurrentActiveCategory(): Category
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
  })
)

useConfigStore.setState({ categories: defaultConfig })
