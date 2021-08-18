import Item from '@/components/Item'
import { getDefaultLayout } from '@/layouts/DefaultLayout'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Content, getCategoriesName, getItems } from '@/logic/item'
import { useConfigStore } from 'src/store'
import Badge from '@/components/Badge'

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
  const tagsList = contents.map((content) => content.Tags).flat()
  const tags = tagsList.filter((tag, index) => tagsList.indexOf(tag) === index)
  return {
    props: {
      contents,
      tags,
    },
  }
}

const Category = ({
  contents,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const currentCategory = useConfigStore((state) =>
    state.getCurrentActiveCategory()
  )
  return (
    <>
      <div className="flex flex-col mt-4 space-y-5">
        <hr className="w-full border-black" />
        <h1 className="text-2xl text-center">
          {currentCategory && currentCategory.description}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          {tags.map((tag: string, index: number) => (
            <Badge key={index} text={tag} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {contents.map((content: Content, index: number) => (
            <Item key={index} {...content} />
          ))}
        </div>
      </div>
    </>
  )
}

Category.getLayout = getDefaultLayout

export default Category
