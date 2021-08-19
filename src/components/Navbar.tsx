import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex w-full px-8 sm:px-16 md:px-32 lg:px-40 xl:px-56 py-8 bg-white min-h-20">
      <div className="flex items-center w-1/3 space-x-4">
        <a
          className="text-sm sm:text-md lg:text-xl font-bold hover:scale-110 transform duration-500"
          href="https://mnismt.notion.site/About-3d0a7bf942ad42a3b4492e4ab8c4e4ca"
          target="_blank"
          rel="noreferrer"
        >
          About
        </a>
      </div>
      <div className="flex items-center justify-center w-1/3">
        <Link href="/" passHref>
          <a className="text-xl sm:text-2xl lg:text-4xl font-bold uppercase hover:scale-110 transform duration-500">
            AWSNT
          </a>
        </Link>
      </div>
      <div className="flex items-center justify-end w-1/3">
        <a
          href="https://mnismt.notion.site/Under-review-cd6cb967662f4f6d87a555540dc0dad7"
          target="_blank"
          className="text-sm sm:text-md lg:text-xl font-bold hover:scale-110 transform duration-500"
        >
          Submit
        </a>
      </div>
    </div>
  )
}

export default Navbar
