import { AnimatePresence, motion } from 'framer-motion'

const CategoryLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col mt-4 space-y-4"
    >
      <hr className="w-full border-black" />
      <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
    </motion.div>
  )
}

export const getCategoryLayout = (page: JSX.Element) => (
  <CategoryLayout>{page}</CategoryLayout>
)

export default CategoryLayout
