import Item from '@/components/Item'
import { getDefaultLayout } from '@/layouts/DefaultLayout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getCategories, getItems } from 'src/logic/item'

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories()
  const paths = categories.map((category) => ({ params: { category } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const category = params.category
  const contents = await getItems(category)
  return {
    props: {
      contents,
    },
  }
}

const Category = ({ contents }: any) => {
  console.log(contents)
  return (
    <>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-3 gap-2">
          {contents.map((content: any, index: number) => (
            <Item
              key={index}
              title={content.Title}
              category={content.Category}
              description={content.Description}
              link={content.Link}
            />
          ))}
        </div>
      </div>
    </>
  )
}

Category.getLayout = getDefaultLayout

export default Category
