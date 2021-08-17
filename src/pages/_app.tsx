import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout
  return getLayout && getLayout(<Component {...pageProps} />)
}

export default MyApp
