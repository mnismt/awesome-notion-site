import Link from 'next/link'
import { useConfigStore } from 'src/store'

const Tab = ({
  title,
  link,
  active,
}: {
  title: string
  link: string
  active: boolean
}) => {
  return (
    <Link href={link} scroll={false} passHref>
      <div
        className={`w-full p-4 text-center transition duration-500 border-2 border-black rounded-lg cursor-pointer
         ${
           active
             ? `border-black text-black hover:shadow-xl`
             : 'border-gray-500 text-gray-500'
         } hover:border-black hover:text-black`}
      >
        <a className="text-xl font-bold lg:text-2xl">{title}</a>
      </div>
    </Link>
  )
}

const CategoriesTab = () => {
  const categories = useConfigStore((state) => state.categories)

  return (
    <div className="flex space-x-2">
      {categories.map((category, index) => {
        const link = `/${category.name.toLowerCase()}`
        return (
          <Tab
            key={index}
            title={category.name}
            link={link}
            active={category.active}
          />
        )
      })}
    </div>
  )
}

export default CategoriesTab
