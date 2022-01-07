import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useConfigStore } from 'src/store'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CategoriesTab from '@/components/CategoriesTab'
import SEO from '@/components/SEO'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const categories = useConfigStore((state) => state.categories)
  const activeCategory = useConfigStore().activeCategory
  const activeAllCategories = useConfigStore().activeAllCategories
  useEffect(() => {
    const path = router.asPath
    if (path !== '/') {
      const index = categories.findIndex((category) => path.includes(category.name.toLowerCase()))
      activeCategory(index)
    } else {
      activeAllCategories()
    }
  }, [router.asPath])
  // check persistent layout
  const getLayout = (Component as any).getLayout
  const children = getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} />
  return (
    <>
      <SEO />
      <Navbar />
      <div className="min-h-screen px-8 py-4 mb-20 sm:px-16 md:px-32 lg:px-40 xl:px-56">
        <div className="px-4 mb-8 space-y-1 text-lg font-bold text-center md:py-4 sm:text-xl">
          <p>A curated list of awesome Notion related things</p>
        </div>
        <CategoriesTab />
        <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default MyApp
