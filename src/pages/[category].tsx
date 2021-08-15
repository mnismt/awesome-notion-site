import Item from '@/components/Item'
import { getDefaultLayout } from '@/layouts/DefaultLayout'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Content, getCategoriesName, getItems } from 'src/logic/item'

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
      contents,
    },
  }
}

const Category = ({
  contents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-3 gap-2">
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
