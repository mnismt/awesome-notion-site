import { Content } from 'src/logic/item'
import Favicon from './Favicon'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Badge from './Badge'

const Item = (props: Content) => (
  <div className="flex flex-col justify-between h-full px-4 py-3 space-y-2 transition duration-700 border-2 border-black rounded-lg group hover:shadow-2xl ">
    <div className="flex flex-col space-y-1">
      <a
        className="flex items-center space-x-2 transition duration-700 justify-first"
        href={props.Link}
        target="_blank"
        rel="noreferrer"
      >
        <Favicon key={props.Link} link={props.Link} />
        <h1 className="text-xl font-bold">{props.Title}</h1>
        <ExternalLinkIcon width={16} height={16} />
      </a>
      <div className="flex">
        <Link href={`/${props.Category}`} passHref>
          <div className="text-sm uppercase py-2">
            <Badge text={props.Category} pointer />
          </div>
        </Link>
      </div>
      <div>
        <p className="font-light text-md">{props.Description}</p>
      </div>
    </div>
    <div className="flex flex-col space-y-3">
      <hr className="w-full border-black" />
      <div className="flex space-x-1">
        {props.Tags &&
          props.Tags.map((tag, index: number) => (
            <Link
              key={index}
              href={`/tag/${tag.toLowerCase()}`}
              passHref={true}
            >
              <div className="flex">
                <Badge text={tag} pointer />
              </div>
            </Link>
          ))}
      </div>
    </div>
  </div>
)

export default Item
