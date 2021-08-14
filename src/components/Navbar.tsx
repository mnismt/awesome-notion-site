const Navbar = () => {
  return (
    <div className="flex w-full px-56 py-8 bg-white min-h-20">
      <div className="flex items-center w-1/3 space-x-4">
        <h1 className="text-xl font-bold">Home</h1>
        <h1 className="text-xl font-bold">Cheatsheet</h1>
        <h1 className="text-xl font-bold">Font generator</h1>
      </div>
      <div className="flex items-center justify-center w-1/3">
        <h1 className="text-4xl font-bold uppercase">AWSNT</h1>
      </div>
      <div className="flex items-center justify-end w-1/3">
        <h1 className="text-xl font-bold">About</h1>
      </div>
    </div>
  )
}

export default Navbar
