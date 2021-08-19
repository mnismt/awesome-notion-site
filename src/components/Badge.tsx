import Link from 'next/link'

const Badge = ({
  text,
  pointer,
  link,
}: {
  text: string
  pointer?: boolean
  link?: string
}) => {
  const className = `px-2 py-1 border-2 border-black rounded-xl hover:scale-105 transform duration-500 ${
    (pointer || link) && 'cursor-pointer'
  }`

  return link ? (
    <Link href={link} passHref>
      <span className={className}>{text}</span>
    </Link>
  ) : (
    <span className={className}>{text}</span>
  )
}

export default Badge
