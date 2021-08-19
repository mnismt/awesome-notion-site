import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Item from '@/components/Item'
import { getCategoryLayout } from '@/layouts/CategoryLayout'
import ContentBox from '@/components/ContentBox'
import { AnimatePresence, motion } from 'framer-motion'

import { useConfigStore } from 'src/store'
import { Content, getCategoriesName, getItems } from '@/logic/item'
import { getDefaultVariants } from '@/logic/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategoriesName()
  const paths = categories.map((category) => ({
    params: { category: category.toLowerCase() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const category = params.category
  const contents: Array<Content> = await getItems(category)
  return {
    props: {
      category,
      contents,
    },
  }
}

const Category = ({
  category,
  contents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const currentCategory = useConfigStore((state) =>
    state.getCurrentActiveCategory()
  )
  const variants = getDefaultVariants(0.3)
  return (
    <motion.div
      key={category}
      className="flex flex-col space-y-4"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <AnimatePresence exitBeforeEnter>
        {currentCategory && (
          <motion.h1
            key={currentCategory.id}
            variants={variants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className="text-2xl text-center font-bold"
          >
            {currentCategory.description}
          </motion.h1>
        )}
      </AnimatePresence>
      <motion.div
        variants={variants}
        custom={1.5}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col space-y-4"
      >
        <ContentBox contents={contents} />
      </motion.div>
    </motion.div>
  )
}

Category.getLayout = getCategoryLayout

export default Category
