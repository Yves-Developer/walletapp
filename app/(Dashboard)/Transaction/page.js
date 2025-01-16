import { DataTable } from "@/Components/ui/data-table";
import { columns } from "./columns";
import Wrapper from "@/Components/Wrapper";
export default function Transaction() {
  const data = [
    {
      category: "Food",
      amount: 100,
      account: "Mobile Money",
      description: "Rice and Stew",
      type: "Expense",
      date: "2021-09-01",
    },
    {
      category: "Salary",
      amount: 100,
      account: "Equity Bank",
      description: "Monthly Salary",
      type: "Income",
      date: "2021-09-30",
    },
    // ...
  ];
  data.push(
    {
      category: "Transport",
      amount: 50,
      account: "Cash",
      description: "Bus fare",
      type: "Expense",
      date: "2021-09-02",
    },
    {
      category: "Entertainment",
      amount: 75,
      account: "Credit Card",
      description: "Movie tickets",
      type: "Expense",
      date: "2021-09-03",
    },
    {
      category: "Freelance",
      amount: 200,
      account: "PayPal",
      description: "Project payment",
      type: "Income",
      date: "2021-09-15",
    }
  );
  for (let i = 0; i < 20; i++) {
    data.push({
      category: "Miscellaneous",
      amount: Math.floor(Math.random() * 100) + 1,
      account: "Bank Account",
      description: `Random expense ${i + 1}`,
      type: "Expense",
      date: `2021-09-${i + 4}`,
    });
  }
  return (
    <div className="py-20">
      <Wrapper>
        <DataTable columns={columns} data={data} action="Export" />
      </Wrapper>
    </div>
  );
}
