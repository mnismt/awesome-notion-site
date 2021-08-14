import { Content } from 'src/logic/item'
import Favicon from './Favicon'
import { ExternalLinkIcon } from '@heroicons/react/solid'

const Item = (content: Content) => (
  <div className="flex flex-col justify-between space-y-2 h-full p-4 transition duration-500 border-2 border-black rounded-lg hover:border-purple-800">
    <div className="flex flex-col space-y-1">
      <a
        className="flex items-center space-x-2 justify-first"
        href={content.Link}
        target="_blank"
      >
        <Favicon key={content.Link} link={content.Link} />
        <h1 className="text-xl font-bold">{content.Title}</h1>
        <ExternalLinkIcon width={16} height={16} />
      </a>
      <div className="flex">
        <div className="px-2 py-1 border-2 border-black rounded-xl">
          <p className="text-sm uppercase">{content.Category}</p>
        </div>
      </div>
      <div>
        <p className="font-light text-md">{content.Description}</p>
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <hr className="border-black w-full" />
      {content.Tags &&
        content.Tags.map((tag, index: number) => (
          <div key={index} className="flex">
            <span className="border-2 border-double border-black py-1 px-2 rounded-xl">
              {tag}
            </span>
          </div>
        ))}
    </div>
  </div>
)

export default Item
