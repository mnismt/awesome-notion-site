import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Item from '@/components/Item'
import { Content, getCategoriesName, getItems } from '@/logic/item'
import Badge from '@/components/Badge'
import { getDefaultVariants, removeDuplicateElements } from '@/logic/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { getCategoryLayout } from '@/layouts/CategoryLayout'
import { useConfigStore } from 'src/store'

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
  const tags = removeDuplicateElements(
    contents.map((content) => content.Tags).flat()
  )
  return {
    props: {
      category,
      contents,
      tags,
    },
  }
}

const AnimationWrapper = ({
  delay,
  children,
  className,
}: {
  delay: number
  children: JSX.Element
  className: string
}) => {
  const variants = getDefaultVariants(0)
  return (
    <motion.div
      variants={variants}
      animate={{ opacity: 1, y: 0, transition: { delay } }}
      initial="hidden"
      exit="hidden"
      className={className}
    >
      {children}
    </motion.div>
  )
}

const Category = ({
  category,
  contents,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const currentCategory = useConfigStore((state) =>
    state.getCurrentActiveCategory()
  )
  const variants = getDefaultVariants(0.3)

  return (
    <motion.div
      key={category}
      className="flex flex-col space-y-5"
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
      <AnimationWrapper
        className="flex items-center justify-center space-x-2"
        delay={0.3}
      >
        {tags.map((tag: string, index: number) => (
          <Link key={index} href={`/tag/${tag.toLowerCase()}`} passHref>
            <div>
              <Badge text={tag} pointer />
            </div>
          </Link>
        ))}
      </AnimationWrapper>
      <AnimationWrapper delay={0.5} className="grid grid-cols-3 gap-4">
        {contents.map((content: Content, index: number) => (
          <Item key={index} {...content} />
        ))}
      </AnimationWrapper>
    </motion.div>
  )
}

Category.getLayout = getCategoryLayout

export default Category
