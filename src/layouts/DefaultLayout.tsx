import Navbar from '@/components/Navbar'

const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar />
      <div className="py-4 px-52">
        <div className="flex flex-col justify-center items-center space-y-4 mb-4">
          <h1 className="text-4xl text-center">Awesome Notion</h1>
          <input
            type="text"
            placeholder="Find something useful"
            className="border-2 border-black p-2 rounded-lg outline-none"
          />
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
