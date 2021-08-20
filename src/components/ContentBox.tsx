import { useEffect, useState } from 'react'
import { search } from 'ss-search'
import { Content } from '@/logic/item'
import {
  checkWebsiteIsLoaded,
  getDefaultVariants,
  removeDuplicateElements,
  setWebsiteLoaded,
} from '@/logic/utils'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import Badge from './Badge'
import Item from './Item'
import SearchBox from './SearchBox'

const ContentBox = ({ contents }: { contents: Content[] }) => {
  const [items, setItems] = useState<Content[]>(contents)
  const [tags, setTags] = useState<Array<string>>()
  const [showTag, setShowTag] = useState<boolean>(false)
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false)
  const [searchText, setSearchText] = useState('')
  const variants = getDefaultVariants(0.05)
  useEffect(() => {
    // check the website's first load, if loaded => display all tags
    const isLoaded = checkWebsiteIsLoaded()
    console.log(isLoaded)
    if (!isLoaded) {
      setShowTag(true)
      setWebsiteLoaded()
    }
  }, [])
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
    const tags = items.map((item) => item.Tags).flat()
    setTags(removeDuplicateElements(tags))
    setEnableAnimation(true)
  }, [items])
  return (
    <>
      <div className="flex flex-col items-center justify-center sm:px-20 md:px-32 lg:px-44 xl:px-56">
        <SearchBox setSearchText={setSearchText} />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-center">
          <button
            className="w-12 h-2 transition duration-300 bg-gray-200 hover:bg-black rounded-xl"
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
                className="flex flex-wrap items-center justify-center"
              >
                {tags?.map((tag, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="px-1 py-2"
                  >
                    <Badge text={tag} link={`/tag/${tag.toLowerCase()}`} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            layout={enableAnimation}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((content, index: number) => (
              <Item key={index} {...content} />
            ))}
          </motion.div>
        </AnimateSharedLayout>
      </div>
    </>
  )
}

export default ContentBox
