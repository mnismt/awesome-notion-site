import { InferGetStaticPropsType } from 'next'
import { Content, getItems } from 'src/logic/item'
import Item from '@/components/Item'
import { getDefaultVariants } from '@/logic/utils'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { search } from 'ss-search'
import Badge from '@/components/Badge'
import SearchBox from '@/components/SearchBox'

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
  const [showTag, setShowTag] = useState<boolean>(false)
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false)
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    setEnableAnimation(false)
    const results = search(
      contents,
      // search keys
      ['Description', 'Type', 'Tags', 'Category', 'Title'],
      searchText
    )
    setItems(results as Content[])
  }, [searchText])
  useEffect(() => {
    setEnableAnimation(true)
  }, [items])
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
          <SearchBox setSearchText={setSearchText} />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center">
            <button
              className="h-2 w-12 bg-gray-200 hover:bg-black transition duration-300 rounded-xl"
              onClick={(_) => setShowTag(!showTag)}
            ></button>
          </div>
          <AnimateSharedLayout>
            <AnimatePresence exitBeforeEnter>
              {showTag && (
                <motion.div
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { stiffness: 4 } }}
                  exit={{ scale: 0, transition: { stiffness: 4 } }}
                  className="flex items-center justify-center"
                >
                  <Badge text="API" link="/api" />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              layout={enableAnimation}
              className="grid grid-cols-3 gap-4"
            >
              {items.map((content, index: number) => (
                <Item key={index} {...content} />
              ))}
            </motion.div>
          </AnimateSharedLayout>
        </div>
      </motion.div>
    </>
  )
}

export default Home
