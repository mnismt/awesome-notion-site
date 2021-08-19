import { InferGetStaticPropsType } from 'next'
import ContentBox from '@/components/ContentBox'
import { motion } from 'framer-motion'

import { Content, getItems } from 'src/logic/item'
import { getDefaultVariants } from '@/logic/utils'

export const getStaticProps = async () => {
  const contents: Array<Content> = await getItems()
  return {
    props: {
      contents,
    },
  }
}

const Home = ({ contents }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const variants = getDefaultVariants(0.3)
  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col mt-4 space-y-4"
      >
        <ContentBox contents={contents} />
      </motion.div>
    </>
  )
}

export default Home
