import { useEffect, useState } from 'react'
import { search } from 'ss-search'

import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import Badge from './Badge'
import Item from './Item'
import SearchBox from './SearchBox'

import { Content } from '@/logic/item'
import { getDefaultVariants, removeDuplicateElements } from '@/logic/utils'

const ContentBox = ({ contents }: { contents: Content[] }) => {
  const [items, setItems] = useState<Content[]>(contents)
  const [tags, setTags] = useState<Array<string>>()
  const [showTag, setShowTag] = useState<boolean>(false)
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false)
  const [searchText, setSearchText] = useState('')
  const variants = getDefaultVariants(0.05)
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
    </>
  )
}

export default ContentBox
