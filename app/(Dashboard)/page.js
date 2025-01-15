import Container from "@/Components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import Wrapper from "@/Components/Wrapper";
import GradientAreaChart from "@/Components/GradientAreaChart";
import SummaryCard from "@/Components/SummaryCard";
import Overview from "@/Components/Overview";
const Home = () => {
  return (
    <section className="w-full py-[80px] px-2">
      <Wrapper>
        <Overview />
        <Container>
          <Card>
            <div className="flex justify-between p-3">
              <CardTitle>Monthly Overview</CardTitle>
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
