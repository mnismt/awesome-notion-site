import Favicon from './Favicon'

const Item = ({
  title,
  description,
  link,
  category,
}: {
  title: string
  description: string
  link: string
  category: string
}) => (
  <div className="flex flex-col p-4 space-y-2 transition duration-500 border-2 border-black rounded-lg hover:border-purple-800">
    <div className="flex items-center space-x-2 justify-first">
      <Favicon key={link} link={link} />
      <a href={link} target="_blank">
        <h1 className="text-xl font-bold">{title}</h1>
      </a>
    </div>
    <div className="flex">
      <div className="px-2 py-1 border-2 border-black rounded-xl">
        <p className="text-sm uppercase">{category}</p>
      </div>
    </div>
    <p className="font-light text-md">{description}</p>
  </div>
)

export default Item
