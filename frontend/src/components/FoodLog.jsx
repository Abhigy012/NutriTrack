import FoodlogForm from "../components/FoodlogForm";

const FoodLog = () => {
  return (
    <div className="flex flex-col w-full min-h-screen gap-4 bg-slate-300 p-5">
      {/* Set fixed height here */}
      <div className="flex-grow flex gap-3 rounded-lg">
        <div id="todayfoodlogs" className="w-3/4 bg-white rounded-lg"></div>
        <FoodlogForm
          id="foodlogform"
          className="w-1/4 bg-blue-300 rounded-lg"
        />
      </div>

      <div
        id="daywisefoodlogs"
        className="h-64 w-full rounded-lg bg-red-400"
      ></div>
    </div>
  );
};
export default FoodLog;
