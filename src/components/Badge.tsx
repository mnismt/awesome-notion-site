import Link from 'next/link'

const Badge = ({
  text,
  pointer,
  link,
  type,
}: {
  text: string
  pointer?: boolean
  link?: string
  type?: string
}) => {
  const typeColor: any = {
    Free: 'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white',
    Freemium: 'bg-gradient-to-r from-purple-400 to-yellow-400 text-white',
    Paid: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white',
  }
  const className = `px-2 py-1 border-2 border-black rounded-xl hover:scale-105 transform duration-500 ${
    type ? typeColor[type] : ''
  } ${(pointer || link) && 'cursor-pointer'}`

  return link ? (
    <Link href={link} passHref>
      <span className={className}>{text}</span>
    </Link>
  ) : (
    <span className={className}>{text}</span>
  )
}

export default Badge
