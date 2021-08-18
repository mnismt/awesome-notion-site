import { InferGetStaticPropsType } from 'next'
import { Content, getItems } from 'src/logic/item'
import Item from '@/components/Item'
import { getDefaultVariants } from '@/logic/utils'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { search } from 'ss-search'

export const getStaticProps = async () => {
  const contents: Array<Content> = await getItems()
  return {
    props: {
      contents,
    },
  }
}

const Home = ({ contents }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const variants = getDefaultVariants(0)
  const [items, setItems] = useState<Content[]>(contents)
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    const results = search(
      contents,
      ['Description', 'Type', 'Tags', 'Category', 'Title'],
      searchText
    )
    setItems(results as Content[])
  }, [searchText])
  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col mt-4 space-y-4"
      >
        <div className="flex flex-col items-center justify-center px-56">
          <input
            type="text"
            placeholder="Search for something useful"
            className="p-2 border-2 border-gray-200 focus:border-black transition duration-500 rounded-lg outline-none w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {items.map((content, index: number) => (
            <Item key={index} {...content} />
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default Home
