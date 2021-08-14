import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  // get persistent layout
  const getLayout = (Component as any).getLayout
  return getLayout(<Component {...pageProps} />)
}
export default MyApp
