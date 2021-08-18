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
  // check persistent layout
  const getLayout = (Component as any).getLayout
  const children = getLayout ? (
    getLayout(<Component {...pageProps} />)
  ) : (
    <Component {...pageProps} />
  )
  return (
    <>
      <Navbar />
      <div className="py-4 px-56 mb-20 min-h-screen">
        <CategoriesTab />
        <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default MyApp
