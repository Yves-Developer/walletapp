"use client";
import Container from "@/Components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import Wrapper from "@/Components/Wrapper";
import GradientAreaChart from "@/Components/GradientAreaChart";
import SummaryCard from "@/Components/SummaryCard";
import Overview from "@/Components/Overview";
import { useEffect, useState } from "react";
import { calculateUtilization } from "@/Utils/helper";
import { Tabs, TabsTrigger, TabsList } from "@/Components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Skeleton } from "@/Components/ui/skeleton";
const Home = () => {
  const [seletcedDate, setSelectedDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), //from last 30days Default
    to: new Date(), //now default
  });
  const [selectedTab, setSelectedTab] = useState("month");
  const [info, setInfo] = useState([]);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState("January");
  const from = new Date(seletcedDate.from).toISOString();
  const to = new Date(seletcedDate.to).toISOString();
  const [item, setItem] = useState([new Date().getFullYear()]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [periodsLoading, setPeriodsLoading] = useState(false);
  const fetchedData = () => {
    setSummaryLoading(true);
    fetch(`/api/summary?from=${from}&to=${to}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(calculateUtilization(data).slice(0, 3));
      })
      .catch((error) => {
        console.error("error:", error.message);
      })
      .finally(() => setSummaryLoading(false));
  };
  useEffect(() => {
    fetchedData();
  }, [from, to]);
  const freshPeriod = () => {
    setPeriodsLoading(true);
    fetch(`/api/history-period`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        console.error("error:", error.message);
      })
      .finally(() => setPeriodsLoading(false));
  };
  useEffect(() => {
    freshPeriod();
  }, []);
  return (
    <section className="w-full py-[80px] px-2">
      <Wrapper>
        <Overview
          trackDate={setSelectedDate}
          setFetch={fetchedData}
          setPeriod={freshPeriod}
        />
        <Container>
          <Card>
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
                      const monthStr = new Date(year, month, 1).toLocaleString(
                        "default",
                        { month: "long" }
                      );
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
            <CardContent>
              <GradientAreaChart
                tabSelected={selectedTab}
                year={year}
                month={month}
              />
            </CardContent>
          </Card>
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
                  {info.map((card) => (
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
        </Container>
      </Wrapper>
    </section>
  );
};

export default Home;
