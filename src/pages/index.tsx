import { InferGetStaticPropsType } from 'next'
import { Content, getItems } from 'src/logic/item'
import Item from '@/components/Item'
import { getDefaultVariants } from '@/logic/utils'
import { motion } from 'framer-motion'

export const getStaticProps = async () => {
  const contents: Array<Content> = await getItems()
  return {
    props: {
      contents,
    },
  }
}

const Home = ({ contents }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const variants = getDefaultVariants(0)
  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col mt-4"
      >
        <div className="grid grid-cols-3 gap-4">
          {contents.map((content, index: number) => (
            <Item key={index} {...content} />
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default Home
