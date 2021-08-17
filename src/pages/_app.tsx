import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { useConfigStore } from 'src/store'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const categories = useConfigStore((state) => state.categories)
  const activeCategory = useConfigStore().activeCategory
  useEffect(() => {
    const path = router.asPath
    let index: number
    if (path !== '/') {
      index = categories.findIndex((category) =>
        path.includes(category.name.toLowerCase())
      )
    } else {
      index = -1
    }
    activeCategory(index)
  }, [router.asPath])
  const getLayout = (Component as any).getLayout
  return getLayout && getLayout(<Component {...pageProps} />)
}

export default MyApp
