function Navbar(){
    return (
    <div className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md">

      <h1 className="text-2xl font-bold">
        RAGVerse AI
      </h1>

      <div className="flex gap-6 text-sm">

        <button className="hover:text-blue-400">
          Compare
        </button>

        <button className="hover:text-blue-400">
          Evaluation
        </button>

        <button className="hover:text-blue-400">
          Settings
        </button>

      </div>
    </div>
    );
}

export default Navbar;