"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  defs,
} from "recharts";

const data = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 200 },
  { month: "Apr", value: 278 },
  { month: "May", value: 189 },
  { month: "Jun", value: 239 },
  { month: "Jul", value: 349 },
  { month: "Aug", value: 210 },
];

const GradientAreaChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {/* Background Grid */}
        <CartesianGrid strokeDasharray="2 2" />

        {/* X & Y Axis */}
        <XAxis dataKey="month" />
        <YAxis />

        {/* Tooltip */}
        <Tooltip />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Area Component with Gradient */}
        <Area
          type="linear"
          dataKey="value"
          stroke="#f97316"
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GradientAreaChart;
