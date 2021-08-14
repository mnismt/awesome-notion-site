import { getDefaultLayout } from '@/layouts/DefaultLayout'
import { getItems } from 'src/logic/item'
import Item from '@/components/Item'

export const getStaticProps = async () => {
  const contents = await getItems()
  return {
    props: {
      contents,
    },
  }
}

const Home = ({ contents }: any) => {
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

Home.getLayout = getDefaultLayout

export default Home
