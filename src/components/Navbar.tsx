const Navbar = () => {
  return (
    <div className="min-h-20 w-full bg-white py-8 px-56 flex">
      <div className="flex items-center space-x-4 w-1/3">
        <h1 className="text-xl font-bold">Home</h1>
        <h1 className="text-xl font-bold">Cheatsheet</h1>
        <h1 className="text-xl font-bold">Font generator</h1>
      </div>
      <div className="w-1/3 flex justify-center items-center">
        <h1 className="text-4xl font-bold uppercase">AWSNT</h1>
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <h1 className="text-xl font-bold">About</h1>
      </div>
    </div>
  )
}

export default Navbar
