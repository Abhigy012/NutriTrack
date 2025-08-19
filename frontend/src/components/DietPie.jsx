import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  proteins: "#3b82f6",
  fats: "#ef4444",
  carbs: "#f59e0b",
};

function formatNumber(n) {
  if (n == null || isNaN(n)) return 0;
  return Math.round(n);
}

export default function DietPie({ nutrition, required }) {
  const [activeKey, setActiveKey] = useState(null);

  if (!nutrition || !required) {
    return (
      <div className="flex items-center justify-center h-56 w-full bg-white rounded-lg">
        <p className="text-gray-500">No data</p>
      </div>
    );
  }

  const macros = {
    proteins: formatNumber(nutrition.macros?.proteins || 0),
    fats: formatNumber(nutrition.macros?.fats || 0),
    carbs: formatNumber(nutrition.macros?.carbs || 0),
  };
  const req = {
    proteins: formatNumber(required.reqProteins || 0),
    fats: formatNumber(required.reqFats || 0),
    carbs: formatNumber(required.reqCarbs || 0),
  };

  const totalReq = req.proteins + req.fats + req.carbs;
  const totalConsumed = macros.proteins + macros.fats + macros.carbs;
  const remaining = Math.max(0, totalReq - totalConsumed);

  const data = [
    { name: "Proteins", key: "proteins", value: macros.proteins, req: req.proteins },
    { name: "Fats", key: "fats", value: macros.fats, req: req.fats },
    { name: "Carbs", key: "carbs", value: macros.carbs, req: req.carbs },
    { name: "Remaining", key: "remaining", value: remaining },
  ];
  const calories = formatNumber(nutrition.calories || 0);
  const reqCal = formatNumber(required.reqCal || 0);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="w-full md:w-2/3" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={1}
              onMouseEnter={(_, idx) => setActiveKey(data[idx].key)}
              onMouseLeave={() => setActiveKey(null)}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={entry.key === 'remaining' ? '#ffffff' : COLORS[entry.key]}
                  stroke={entry.key === 'remaining' ? '#e5e7eb' : undefined}
                  fillOpacity={activeKey && entry.key !== 'remaining' && activeKey !== entry.key ? 0.25 : 1}
                  strokeOpacity={activeKey && entry.key !== 'remaining' && activeKey !== entry.key ? 0.25 : 1}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, item) => {
                const payload = item?.payload || {};
                if (payload.key === 'remaining') {
                  return [`${value}g`, 'Remaining'];
                }
                const reqVal = payload.req ?? 0;
                return [`${value}g (of ${reqVal}g)`, name];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-gray-500">Calories</div>
        <div className="text-lg font-bold">{calories} / {reqCal}</div>
        {data.filter(d => d.key !== 'remaining').map((d) => (
          <div key={d.key} className="flex items-center gap-3">
            <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: COLORS[d.key], opacity: activeKey && activeKey !== d.key ? 0.25 : 1 }} />
            <span className="w-20">{d.name}</span>
            <span className="text-sm">{d.value}g / {d.req}g</span>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <span className="inline-block w-3 h-3 rounded border border-gray-200 bg-white" />
          <span className="w-20">Remaining</span>
          <span className="text-sm">{remaining}g</span>
        </div>
      </div>
    </div>
  );
}


