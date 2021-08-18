import { InferGetStaticPropsType } from 'next'
import { Content, getItems } from 'src/logic/item'
import Item from '@/components/Item'

export const getStaticProps = async () => {
  const contents: Array<Content> = await getItems()
  return {
    props: {
      contents,
    },
  }
}

const Home = ({ contents }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-3 gap-4">
          {contents.map((content, index: number) => (
            <Item key={index} {...content} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
