"use client";
import Wrapper from "@/Components/Wrapper";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/Components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import MyBarChart from "@/Components/bar-chart";
import { Skeleton } from "@/Components/ui/skeleton";
import { createColumns } from "./columns";
import { DataTable } from "@/Components/ui/data-table";
import { useToast } from "@/hooks/use-toast";
import SummaryCard from "@/Components/SummaryCard";
import { calculateUtilization } from "@/Utils/helper";

const Report = () => {
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("month");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState("January");
  const [item, setItem] = useState([new Date().getFullYear()]);
  const [periodsLoading, setPeriodsLoading] = useState(false);
  const [newDateValue, setNewDateValue] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), // last 30 days
    to: new Date(), // now
  });
  const [info, setInfo] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Convert the date range to ISO format for API request
  const from = newDateValue.from.toISOString();
  const to = newDateValue.to.toISOString();

  const fetchedData = () => {
    setSummaryLoading(true);
    fetch(`/api/summary?from=${from}&to=${to}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(calculateUtilization(data));
      })
      .catch((error) => {
        console.error("Error fetching summary:", error.message);
      })
      .finally(() => setSummaryLoading(false));
  };

  useEffect(() => {
    fetchedData();
  }, [from, to]);

  useEffect(() => {
    setPeriodsLoading(true);
    fetch(`/api/history-period`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("Error fetching periods:", error))
      .finally(() => setPeriodsLoading(false));
  }, []);

  useEffect(() => {
    setBudgetLoading(true);
    fetch("/api/category")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => {
          const isIncome = item.type === "Income";

          const status = isIncome
            ? item.amount < item.budgetLeft
              ? "Good"
              : item.amount > item.budgetLeft
              ? "Over Achieved"
              : "On Budget"
            : item.amount > item.budgetLeft
            ? "Over Budget"
            : item.amount < item.budgetLeft
            ? "Under Budget"
            : "On Budget";

          return {
            category: item.name,
            type: item.type,
            amount: item.amount,
            budgetLeft: parseFloat(item.budgetLeft),
            status: status,
          };
        });

        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setBudgetLoading(false));
  }, []);

  return (
    <div className="pt-20">
      <Wrapper>
        <Header title="Generate Report" setNewDateValue={setNewDateValue} />
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="graph">Graph</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="w-full">
            <DataTable
              columns={createColumns(toast, setData)}
              data={data}
              action="Export"
              isLoading={budgetLoading}
            />
          </TabsContent>
          <TabsContent value="graph">
            <Card className="w-full p-10">
              <div className="flex items-center justify-between p-3">
                <Tabs
                  defaultValue="month"
                  value={selectedTab}
                  onValueChange={setSelectedTab}
                >
                  <TabsList>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
                {periodsLoading ? (
                  <Skeleton className="w-[90px] h-[20px]" />
                ) : (
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="w-[90px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {item.map((i, index) => (
                        <SelectItem value={String(i)} key={index}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {selectedTab === "month" && (
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
                        const monthStr = new Date(
                          year,
                          month,
                          1
                        ).toLocaleString("default", { month: "long" });
                        return (
                          <SelectItem value={monthStr} key={month}>
                            {monthStr}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <MyBarChart tabSelected={selectedTab} year={year} month={month} />
            </Card>
          </TabsContent>
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <Separator className="mt-1" />
              </CardHeader>
              <CardContent>
                {summaryLoading ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <div className="flex flex-col gap-2">
                    {info.map((card, index) => (
                      <SummaryCard
                        key={card.category}
                        budget={card.budget}
                        isIncome={card.type === "Income"}
                        amount={`$${card.totalAmount}`}
                        util={card.utilization > 100 ? 100 : card.utilization}
                        utilValue={card.utilization}
                        description={card.category}
                        color={
                          card.utilization > 100
                            ? card.type === "Income"
                              ? "bg-green-600"
                              : "bg-red-600"
                            : "bg-primary"
                        }
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Wrapper>
    </div>
  );
};

export default Report;
