const Badge = ({ text }: { text: string }) => {
  return (
    <span className="px-2 py-1 border-2 border-black rounded-xl">{text}</span>
  )
}

export default Badge
