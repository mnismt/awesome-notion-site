import { Dispatch, SetStateAction } from 'react'
import debounce from 'lodash.debounce'

const SearchBox = ({
  setSearchText,
}: {
  setSearchText: Dispatch<SetStateAction<string>>
}) => {
  // debounce search with delay time = 500ms
  const debounceSetText = debounce((text: string) => {
    setSearchText(text)
  }, 500)
  return (
    <input
      type="text"
      placeholder="Search for something useful"
      className="p-2 border-2 border-gray-200 focus:border-black transition duration-500 rounded-lg outline-none w-full"
      onChange={(e) => debounceSetText(e.target.value)}
    />
  )
}

export default SearchBox
