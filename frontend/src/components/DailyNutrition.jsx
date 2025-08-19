import Loading from "./Loading";

export default function DailyNutrition({ nutrition }) {
  if (!nutrition) return <Loading />;
  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-sm mx-auto ">
      <h2 className="text-xl font-bold text-center mb-2">Today's Nutrition</h2>
      <p className="text-center text-2xl">{nutrition.calories} kcal</p>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Proteins:</span>
          <span>{nutrition.macros.proteins}g</span>
        </div>
        <div className="flex justify-between">
          <span>Fats:</span>
          <span>{nutrition.macros.fats}g</span>
        </div>
        <div className="flex justify-between">
          <span>Carbs:</span>
          <span>{nutrition.macros.carbs}g</span>
        </div>
      </div>
    </div>
  );
}
