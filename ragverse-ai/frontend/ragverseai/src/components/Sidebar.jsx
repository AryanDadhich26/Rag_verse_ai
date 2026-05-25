function Sidebar(){
    const MenuItems =[
        "Dashboard",
        "Compare RAGs",
        "Pipeline Explorer",
        "Evaluation",
        "Datasets",
        "Saved Experiments"
    ];

    return (
        <div className="w-64 h-screen bg-gray-100 border-r p-4">

      <h2 className="text-xl font-bold mb-8">
        Navigation
      </h2>

      <div className="flex flex-col gap-4">

        {MenuItems.map((item, index) => (

          <button
            key={index}
            className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            {item}
          </button>

        ))}

      </div>
    </div>

    );
}

export default Sidebar;