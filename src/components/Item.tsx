import { Content } from 'src/logic/item'
import Favicon from './Favicon'
import Badge from './Badge'

const ExternalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)
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
        <h1 className="text-sm font-bold md:text-md lg:text-xl">
          {props.Title}
        </h1>
        <ExternalIcon />
      </a>
      <div className="flex py-1 text-sm uppercase">
        <Badge text={props.Category} link={`/${props.Category}`} />
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
            <Badge key={index} text={tag} link={`/tag/${tag.toLowerCase()}`} />
          ))}
      </div>
    </div>
  </div>
)

export default Item
