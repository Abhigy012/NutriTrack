function FoodlogTable({ foodLog }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3 bg-blue-500">
              Food Name
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 bg-blue-500">
              Protein
            </th>
            <th scope="col" className="px-6 py-3">
              Carbohydrates
            </th>
            <th scope="col" className="px-6 py-3 bg-blue-500">
              Fats
            </th>
            <th scope="col" className="px-6 py-3 bg-blue-500">
              Time
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
                className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                {food.foodName}
              </th>
              <td className="px-6 py-4">{food.quantity}</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">
                {new Date(food.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodlogTable;
