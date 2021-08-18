import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Content, getItemsByTag, getTags } from '@/logic/item'
import Item from '@/components/Item'
import { capitalizeFirstLetter } from '@/logic/utils'

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
  const tagName = capitalizeFirstLetter(tag)
  const contents: Array<Content> = await getItemsByTag(tagName)
  return {
    props: {
      contents,
      tag: tagName,
    },
  }
}

const Tag = ({
  contents,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="flex flex-col mt-4 space-y-5">
        <hr className="w-full border-black" />
        <h1 className="text-4xl font-bold text-center">{tag}</h1>
        <div className="grid grid-cols-3 gap-4">
          {contents.map((content: Content, index: number) => (
            <Item key={index} {...content} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Tag
