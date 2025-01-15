"use client";
import StatsCards from "./StatsCards";
import { Separator } from "./ui/separator";
import { DateRangePicker } from "./ui/date-range-picker";
import Modal from "./Modal";
const Overview = () => {
  return (
    <>
      <div className="flex justify-between items-center py-9 w-full bg-background/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-foreground">Overview</h2>
        <div className="flex space-x-2">
          <Modal btnCaption="New Income" title="Add Income" type="Income" />
          <Modal btnCaption="New Expense" title="Add Expense" type="Expense" />
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
