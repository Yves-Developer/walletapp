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
const Home = () => {
  const [seletcedDate, setSelectedDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), //from last 30days Default
    to: new Date(), //now default
  });
  const [selectedTab, setSelectedTab] = useState("month");
  const [info, setInfo] = useState([]);
  const [year, setYear] = useState("2025");
  const from = new Date(seletcedDate.from).toISOString();
  const to = new Date(seletcedDate.to).toISOString();
  useEffect(() => {
    fetch(`/api/summary?from=${from}&to=${to}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(calculateUtilization(data).slice(0, 3));
      })
      .catch((error) => {
        console.error("error:", error.message);
      });
  }, [from, to]);
  return (
    <section className="w-full py-[80px] px-2">
      <Wrapper>
        <Overview trackDate={setSelectedDate} />
        <Container>
          <Card>
            <div className="flex justify-between p-3">
              <CardTitle>Monthly Overview</CardTitle>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
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
            </div>
            <CardContent>
              <GradientAreaChart tabSelected={selectedTab} year={year} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent>
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
                {/* <SummaryCard
                  budget="$500"
                  isIncome={true}
                  amount="$400"
                  util={(400 / 500) * 100}
                  description="Salary"
                />
                <SummaryCard
                  budget="$100"
                  isIncome={false}
                  amount="$10"
                  util={(10 / 100) * 100}
                  description="Payments"
                /> */}
              </div>
            </CardContent>
          </Card>
        </Container>
      </Wrapper>
    </section>
  );
};

export default Home;
