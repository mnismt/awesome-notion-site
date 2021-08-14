import Navbar from '@/components/Navbar'
import Link from 'next/link'

const Tab = ({ title, link }: { title: string; link: string }) => (
  <Link href={link}>
    <div className="w-full p-4 text-center transition duration-500 border-2 border-black rounded-lg cursor-pointer hover:shadow-xl">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  </Link>
)

const DefaultLayout = ({ children }: { children: JSX.Element }) => {
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
          <Tab title="Websites" link="/websites" />
          <Tab title="Resources" link="/resources" />
          <Tab title="CMS" link="/cms" />
          <Tab title="Tools" link="/tools" />
          <Tab title="Dev" link="/dev" />
          <Tab title="Communities" link="/communities" />
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
