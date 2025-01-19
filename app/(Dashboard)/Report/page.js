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
import { Card, CardHeader } from "@/Components/ui/card";
import MyBarChart from "@/Components/bar-chart";
import { Skeleton } from "@/Components/ui/skeleton";
import { createColumns } from "./columns";
import { DataTable } from "@/Components/ui/data-table";
import { useToast } from "@/hooks/use-toast";
const Report = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [data, setData] = useState([]);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("month");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState("January");
  const [item, setItem] = useState([new Date().getFullYear()]);
  const [periodsLoading, setPeriodsLoading] = useState(false);

  useEffect(() => {
    // Fetch periods for year selection
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
          return {
            category: item.name,
            type: item.type,
            amount: item.amount,
          };
        });
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setBudgetLoading(false));
  }, []);

  const columns = createColumns(toast, setData);
  return (
    <div className="pt-20">
      <Wrapper>
        <Header title="Generate Report" className="pt-20" />
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="graph">Graph</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="w-full">
            <DataTable
              columns={columns}
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
        </Tabs>
      </Wrapper>
    </div>
  );
};

export default Report;
