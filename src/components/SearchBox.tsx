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
      className="w-full p-2 transition duration-500 border-2 border-gray-200 rounded-lg outline-none focus:border-black"
      onChange={(e) => debounceSetText(e.target.value)}
    />
  )
}

export default SearchBox
