const Badge = ({ text, pointer }: { text: string; pointer?: boolean }) => {
  return (
    <span
      className={`px-2 py-1 border-2 border-black rounded-xl hover:scale-105 transform duration-500 ${
        pointer && 'cursor-pointer'
      }`}
    >
      {text}
    </span>
  )
}

export default Badge
