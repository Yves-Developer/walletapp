"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
const MyBarChart = ({ tabSelected, year, month }) => {
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
              : "Invalid";
          return { day: day, Income: item.income, Expense: item.expense };
        });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <BarChart
          data={ChartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          {/* X & Y Axis */}
          <XAxis dataKey={tabValue === "year" ? "month" : "day"} />
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
          <Bar dataKey="Income" fill="url(#colorIncome)" />
          <Bar dataKey="Expense" fill="url(#colorExpense)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;
