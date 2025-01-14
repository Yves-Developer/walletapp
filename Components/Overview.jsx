"use client";
import StatsCards from "./StatsCards";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DateRangePicker } from "./ui/date-range-picker";
const Overview = () => {
  return (
    <>
      <div className="flex justify-between items-center py-9 w-full bg-background/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-foreground">Overview</h2>
        <div className="flex space-x-2">
          <Button>New Income</Button>
          <Button>New Expense</Button>
          <DateRangePicker
            onUpdate={(values) => console.log(values)}
            initialDateFrom="2025-01-01"
            initialDateTo="2025-01-31"
            align="start"
            locale="en-GB"
            showCompare={false}
          />
        </div>
      </div>
      <Separator className="mb-4 mt-2" />
      <StatsCards />
    </>
  );
};

export default Overview;
