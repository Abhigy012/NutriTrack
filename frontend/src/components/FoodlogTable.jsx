const url = import.meta.env.VITE_API_URL;

function FoodlogTable({ foodLog, onDeleted }) {
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${url}/food/deleteFoodLog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        if (onDeleted) onDeleted(id);
      }
    } catch (e) {
      // ignore for MVP
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-xs sm:text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
          <tr>
            <th scope="col" className="px-3 sm:px-6 py-3 text-center bg-blue-500">
              Food Name
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3 text-center">
              Calories
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3 text-center bg-blue-500">
              Protein
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3 text-center">
              Carbohydrates
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3 text-center bg-blue-500">
              Fats
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3 text-center bg-blue-500">
              Time
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {foodLog.map((food) => (
            <tr
              key={food._id || food.foodName}
              className="bg-blue-600 border-blue-400"
            >
              <th
                scope="row"
                className="px-3 sm:px-6 py-4 font-medium bg-blue-500 text-center text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                {food.foodName}
              </th>
              <td className="px-3 sm:px-6 py-4 text-center">{food.calories} </td>
              <td className="px-3 sm:px-6 py-4 text-center">
                {food.macros.proteins} g
              </td>
              <td className="px-3 sm:px-6 py-4 text-center">{food.macros.carbs} g</td>
              <td className="px-3 sm:px-6 py-4 text-center">{food.macros.fats} g</td>
              <td className="px-3 sm:px-6 py-4 text-center">
                {new Date(food.timestamp).toLocaleTimeString()}
              </td>
              <td className="px-3 sm:px-6 py-4 text-center">
                {food._id ? (
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="px-2 py-1 bg-red-400 text-white rounded cursor-pointer hover:bg-red-500"
                  >
                    Delete
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodlogTable;
