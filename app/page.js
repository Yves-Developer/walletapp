"use client";
import AreaChart from "@/Components/GradientAreaChart";
import Container from "@/Components/Container";
import StatsCards from "@/Components/StatsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import Wrapper from "@/Components/Wrapper";
import GradientAreaChart from "@/Components/GradientAreaChart";
import SummaryCard from "@/Components/SummaryCard";
import { DateRangePicker } from "@/Components/ui/date-range-picker";
const Home = () => {
  return (
    <section className="w-full py-[80px] px-2">
      <Wrapper>
        <StatsCards />
        <Container>
          <Card>
            <div className="flex justify-between p-3">
              <CardTitle>Monthly Overview</CardTitle>
              <DateRangePicker
                onUpdate={(values) => console.log(values)}
                initialDateFrom="2023-01-01"
                initialDateTo="2023-12-31"
                align="start"
                locale="en-GB"
                showCompare={false}
              />
            </div>
            <CardContent>
              <GradientAreaChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <SummaryCard
                  budget="$200"
                  isIncome={false}
                  amount="$100"
                  util={(100 / 200) * 100}
                  description="Food and Drinks"
                />
                <SummaryCard
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
                />
              </div>
            </CardContent>
          </Card>
        </Container>
      </Wrapper>
    </section>
  );
};

export default Home;
