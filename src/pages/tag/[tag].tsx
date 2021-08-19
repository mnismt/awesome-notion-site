import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Content, getItemsByTag, getTags } from '@/logic/item'
import Item from '@/components/Item'
import { getDefaultVariants } from '@/logic/utils'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getTags()
  const paths = tags.map((tag) => ({
    params: { tag: tag.toLowerCase() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const tag = params.tag
  const contents: Array<Content> = await getItemsByTag(tag)
  return {
    props: {
      contents,
      tag,
    },
  }
}

const Tag = ({
  contents,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const variants = getDefaultVariants(0)
  // Get the original tag
  const originalTag = contents[0].Tags.filter(
    (contentTag: string) => contentTag.toLowerCase() === tag
  )[0]
  return (
    <>
      <NextSeo title={`${originalTag} - Awesome Notion`} />
      <motion.div
        key={tag}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col mt-4 space-y-5"
      >
        <hr className="w-full border-black" />
        <h1 className="text-2xl lg:text-4xl font-bold text-center">
          {originalTag}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((content: Content, index: number) => (
            <Item key={index} {...content} />
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default Tag
