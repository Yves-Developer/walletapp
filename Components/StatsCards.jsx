import { Card } from "./ui/card";
import CountUp from "react-countup";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
const StatsCards = () => {
  return (
    <div className="flex w-full gap-4">
      <Card className="w-full h-24 flex items-center gap-2 p-4">
        <TrendingUp className="w-12 h-12 text-green-600 bg-green-600/10 p-2 items-center rounded" />
        <div className="flex flex-col gap-0">
          <h3 className="text-muted-foreground">Income</h3>
          <CountUp
            preserveValue
            redraw="false"
            end="3000"
            prefix="$"
            className="text-2xl"
            decimal="2"
          />
        </div>
      </Card>

      <Card className="w-full h-24 flex items-center gap-2 p-4">
        <TrendingDown className="w-12 h-12 text-red-600 bg-red-600/10 p-2 items-center rounded" />
        <div className="flex flex-col gap-0">
          <h3 className="text-muted-foreground">Expenses</h3>
          <CountUp
            preserveValue
            redraw="false"
            end="2000"
            prefix="$"
            className="text-2xl"
            decimal="2"
          />
        </div>
      </Card>

      <Card className="w-full h-24 flex items-center gap-2 p-4">
        <Wallet className="w-12 h-12 text-blue-600 bg-blue-600/10 p-2 items-center rounded" />
        <div className="flex flex-col gap-0">
          <h3 className="text-muted-foreground">Balance</h3>
          <CountUp
            preserveValue
            redraw="false"
            end="1000"
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
