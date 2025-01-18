"use client";
import StatsCards from "./StatsCards";
import { Separator } from "./ui/separator";
import { DateRangePicker } from "./ui/date-range-picker";
import Modal from "./Modal";
import { useState } from "react";
const Overview = ({ trackDate }) => {
  const [values, setValues] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 days ago
    to: new Date(), // Today
  });
  return (
    <>
      <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between py-6 sm:py-9 w-full bg-background/80 backdrop-blur-sm">
        <h2 className="hidden md:block text-2xl font-bold text-foreground">
          Overview
        </h2>
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
          <div className="flex space-x-2 mb-2">
            <Modal btnCaption="New Income" title="Add Income" type="Income" />
            <Modal
              btnCaption="New Expense"
              title="Add Expense"
              type="Expense"
            />
          </div>
          <DateRangePicker
            onUpdate={(newValues) => {
              setValues(newValues.range);
              trackDate(newValues.range);
            }}
            initialDateFrom={values.from.toISOString().split("T")[0]}
            initialDateTo={values.to.toISOString().split("T")[0]}
            align="start"
            locale="en-GB"
            showCompare={false}
          />
        </div>
      </div>
      <Separator className="mb-4 mt-2" />
      <StatsCards dateRange={values} />
    </>
  );
};

export default Overview;
