"use client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
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
import { Skeleton } from "./ui/skeleton";

const GradientAreaChart = ({ tabSelected, year, month }) => {
  const tabValue = tabSelected || "month";
  const selectedYear = year || new Date().getFullYear();
  const selectedMonth = new Date(`${month} 1,${year}`).getMonth();
  const [data, setData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  useEffect(() => {
    setChartLoading(true);
    fetch(
      `/api/history?timeframe=${tabSelected}&year=${selectedYear}&month=${selectedMonth}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Fetching error: ", error.message);
      })
      .finally(() => setChartLoading(false));
  }, [tabValue, selectedYear, selectedMonth]);

  const ChartData =
    tabValue === "year"
      ? data.map((item) => {
          const monthName = format(
            new Date(selectedYear, item.month, 1),
            "MMM"
          );
          return {
            month: monthName,
            Income: item.income,
            Expense: item.expense,
          };
        })
      : data.map((item) => {
          const day =
            item.day && !isNaN(item.day)
              ? format(new Date(selectedYear, 0, item.day), "dd")
              : "Invalid"; // Use fallback if day is invalid
          return { day: day, Income: item.income, Expense: item.expense };
        });

  return (
    <ResponsiveContainer width="100%" height={300}>
      {chartLoading ? (
        <Skeleton className="w-full h-[200px]" />
      ) : ChartData.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p> // Display when ChartData is empty
      ) : (
        <AreaChart
          data={ChartData}
          margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
        >
          {/* Background Grid */}
          <CartesianGrid strokeDasharray="2 2" vertical={false} />

          {/* X & Y Axis */}
          <XAxis dataKey={tabSelected === "year" ? "month" : "day"} />
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Area Component with Gradient */}
          <Area
            type="linear"
            dataKey="Income"
            stroke="#16a34a"
            fill="url(#colorIncome)"
          />
          <Area
            type="linear"
            dataKey="Expense"
            stroke="#DC2626"
            fill="url(#colorExpense)"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export default GradientAreaChart;
