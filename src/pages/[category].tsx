import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { getCategoryLayout } from '@/layouts/CategoryLayout'
import ContentBox from '@/components/ContentBox'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Content,
  getCategories,
  getCategoriesName,
  getItems,
} from '@/logic/item'
import { getDefaultVariants } from '@/logic/utils'
import { NextSeo } from 'next-seo'

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
  const categoryName = params.category
  const category = getCategories().filter(
    (category) => category.Name.toLowerCase() === categoryName
  )[0]
  const contents: Array<Content> = await getItems(categoryName)
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
  const variants = getDefaultVariants(0.3)
  return (
    <>
      <NextSeo
        title={`${category.Name} - Awesome Notion`}
        description={category.Description}
      />
      <motion.div
        key={category.Name}
        className="flex flex-col space-y-4"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <AnimatePresence exitBeforeEnter>
          <motion.h1
            key={category.id}
            variants={variants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className="text-2xl text-center font-bold"
          >
            {category.Description}
          </motion.h1>
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
    </>
  )
}

Category.getLayout = getCategoryLayout

export default Category
