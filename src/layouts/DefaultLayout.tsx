import Navbar from '@/components/Navbar'
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
    <Link href={link} passHref>
      <div
        className={`w-full p-4 text-center transition duration-500 border-2 border-black rounded-lg cursor-pointer
         ${
           active ? `border-black text-black` : 'border-gray-500 text-gray-500'
         } hover:border-black hover:text-black`}
      >
        <a className="text-xl font-bold lg:text-2xl">{title}</a>
      </div>
    </Link>
  )
}

const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  const categories = useConfigStore((state) => state.categories)
  return (
    <>
      <Navbar />
      <div className="py-4 px-52">
        <div className="flex flex-col items-center justify-center mb-4 space-y-4">
          <h1 className="text-4xl text-center">Awesome Notion</h1>
          <input
            type="text"
            placeholder="Find something useful"
            className="p-2 border-2 border-black rounded-lg outline-none"
          />
        </div>
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
        {children}
      </div>
    </>
  )
}

export const getDefaultLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default DefaultLayout
