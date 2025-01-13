"use client";
import { Card } from "./ui/card";
import CountUp from "react-countup";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full gap-4">
      <Card className="flex-1 h-24 flex items-center gap-4 p-4">
        <TrendingUp className="w-12 h-12 text-green-600 bg-green-600/10 p-2 rounded" />
        <div className="flex flex-col">
          <h3 className="text-muted-foreground">Income</h3>
          <CountUp
            preserveValue
            redraw={false}
            end={3000}
            prefix="$"
            className="text-2xl"
            decimal="2"
          />
        </div>
      </Card>

      <Card className="flex-1 h-24 flex items-center gap-4 p-4">
        <TrendingDown className="w-12 h-12 text-red-600 bg-red-600/10 p-2 rounded" />
        <div className="flex flex-col">
          <h3 className="text-muted-foreground">Expenses</h3>
          <CountUp
            preserveValue
            redraw={false}
            end={2000}
            prefix="$"
            className="text-2xl"
            decimal="2"
          />
        </div>
      </Card>

      <Card className="flex-1 h-24 flex items-center gap-4 p-4">
        <Wallet className="w-12 h-12 text-blue-600 bg-blue-600/10 p-2 rounded" />
        <div className="flex flex-col">
          <h3 className="text-muted-foreground">Balance</h3>
          <CountUp
            preserveValue
            redraw={false}
            end={1000}
            prefix="$"
            className="text-2xl"
            decimal="2"
          />
        </div>
      </Card>
    </div>
  );
};

export default StatsCards;
