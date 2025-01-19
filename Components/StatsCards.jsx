"use client";
import { Card } from "./ui/card";
import CountUp from "react-countup";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const StatsCards = ({ dateRange, freshData }) => {
  const [stats, setStats] = useState({ income: 0, expense: 0 });
  const from = dateRange?.from
    ? new Date(dateRange.from).toISOString()
    : new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
  const to = dateRange?.to
    ? new Date(dateRange.to).toISOString()
    : new Date().toISOString();
  const [statsLoading, setStatsLoading] = useState(false);
  const fetchedBalance = () => {
    setStatsLoading(true);
    fetch(`/api/balance?to=${to}&from=${from}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStats({ income: data.income, expense: data.expense });
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      })
      .finally(() => setStatsLoading(false));
  };
  useEffect(() => {
    fetchedBalance();
  }, [from, to, freshData]);

  return (
    <div className="flex flex-col sm:flex-row w-full gap-4">
      {statsLoading ? (
        <Skeleton className="w-full h-24" />
      ) : (
        <Card className="flex-1 h-24 flex items-center gap-4 p-4">
          <TrendingUp className="w-12 h-12 text-green-600 bg-green-600/10 p-2 rounded" />
          <div className="flex flex-col">
            <h3 className="text-muted-foreground">Income</h3>
            <CountUp
              preserveValue
              redraw={false}
              end={stats.income}
              prefix="$"
              className="text-2xl"
              decimal="2"
            />
          </div>
        </Card>
      )}
      {statsLoading ? (
        <Skeleton className="w-full h-24" />
      ) : (
        <Card className="flex-1 h-24 flex items-center gap-4 p-4">
          <TrendingDown className="w-12 h-12 text-red-600 bg-red-600/10 p-2 rounded" />
          <div className="flex flex-col">
            <h3 className="text-muted-foreground">Expenses</h3>
            <CountUp
              preserveValue
              redraw={false}
              end={stats.expense}
              prefix="$"
              className="text-2xl"
              decimal="2"
            />
          </div>
        </Card>
      )}
      {statsLoading ? (
        <Skeleton className="w-full h-24" />
      ) : (
        <Card className="flex-1 h-24 flex items-center gap-4 p-4">
          <Wallet className="w-12 h-12 text-blue-600 bg-blue-600/10 p-2 rounded" />
          <div className="flex flex-col">
            <h3 className="text-muted-foreground">Balance</h3>
            <CountUp
              preserveValue
              redraw={false}
              end={stats.income - stats.expense}
              prefix="$"
              className="text-2xl"
              decimal="2"
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default StatsCards;
