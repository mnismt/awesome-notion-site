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
import SEO from '@/components/SEO'
import Head from 'next/head'

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter"
          rel="stylesheet"
        />
      </Head>
      <SEO />
      <Navbar />
      <div className="py-4 px-8 sm:px-16 md:px-32 lg:px-40 xl:px-56 mb-20 min-h-screen">
        <div>
          <p className="px-4 md:py-4 mb-8 text-lg sm:text-xl font-bold text-center">
            A curated list of awesome Notion websites, resources, tools,... and
            more.
          </p>
        </div>
        <CategoriesTab />
        <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default MyApp
