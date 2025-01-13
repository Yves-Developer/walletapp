import AreaChart from "@/Components/GradientAreaChart";
import Container from "@/Components/Container";
import StatsCards from "@/Components/StatsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import Wrapper from "@/Components/Wrapper";
import GradientAreaChart from "@/Components/GradientAreaChart";
const Home = () => {
  return (
    <section className="w-full py-[80px] px-2">
      <Wrapper>
        <StatsCards />
        <Container>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600/10 rounded-full"></div>
                    <div>
                      <h3 className="text-muted-foreground">Payment</h3>
                      <p className="text-lg">Payment from John Doe</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-green-600">+$200</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-600/10 rounded-full"></div>
                    <div>
                      <h3 className="text-muted-foreground">Expense</h3>
                      <p className="text-lg">Payment to Jane Doe</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-red-600">-$100</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600/10 rounded-full"></div>
                    <div>
                      <h3 className="text-muted-foreground">Payment</h3>
                      <p className="text-lg">Payment from John Doe</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-green-600">+$200</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-600/10 rounded-full"></div>
                    <div>
                      <h3 className="text-muted-foreground">Expense</h3>
                      <p className="text-lg">Payment to Jane Doe</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-red-600">-$100</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Wrapper>
    </section>
  );
};

export default Home;
