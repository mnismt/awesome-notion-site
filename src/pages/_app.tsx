import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { useConfigStore } from 'src/store'
import Navbar from '@/components/Navbar'
import { AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import CategoriesTab from '@/components/CategoriesTab'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const categories = useConfigStore((state) => state.categories)
  const activeCategory = useConfigStore().activeCategory
  const activeAllCategories = useConfigStore().activeAllCategories
  useEffect(() => {
    const path = router.asPath
    if (path !== '/') {
      const index = categories.findIndex((category) =>
        path.includes(category.name.toLowerCase())
      )
      activeCategory(index)
    } else {
      activeAllCategories()
    }
  }, [router.asPath])
  return (
    <>
      <Navbar />
      <div className="py-4 px-56 mb-20">
        <div className="flex flex-col items-center justify-center mb-4 space-y-4">
          <h1 className="text-4xl text-center font-bold">Awesome Notion</h1>
          <input
            type="text"
            placeholder="Find something useful"
            className="p-2 border-2 border-black rounded-lg outline-none"
          />
        </div>
        <CategoriesTab />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default MyApp
