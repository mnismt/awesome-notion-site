import { InferGetStaticPropsType } from 'next'
import { Content, getItems, getTags } from 'src/logic/item'
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
  const variants = getDefaultVariants(0.05)
  const [items, setItems] = useState<Content[]>(contents)
  const [tags, setTags] = useState<Array<string>>()
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
    setTags(items.map((item) => item.Tags).flat())
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
                  layout={enableAnimation}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex items-center justify-center flex-wrap"
                >
                  {tags?.map((tag, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="py-2 px-1"
                    >
                      <Badge text={tag} link={`/tag/${tag.toLowerCase()}`} />
                    </motion.div>
                  ))}
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
