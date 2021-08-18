import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex w-full px-56 py-8 bg-white min-h-20">
      <div className="flex items-center w-1/3 space-x-4">
        <a
          className="text-xl font-bold"
          href="https://mnismt.notion.site/About-3d0a7bf942ad42a3b4492e4ab8c4e4ca"
          target="_blank"
          rel="noreferrer"
        >
          About
        </a>
      </div>
      <div className="flex items-center justify-center w-1/3">
        <Link href="/" passHref>
          <a className="text-5xl font-bold uppercase">AWSNT</a>
        </Link>
      </div>
      <div className="flex items-center justify-end w-1/3">
        <h1 className="text-xl font-bold">Submit</h1>
      </div>
    </div>
  )
}

export default Navbar
