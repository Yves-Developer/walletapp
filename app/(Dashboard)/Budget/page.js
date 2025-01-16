import { DataTable } from "@/Components/ui/data-table";
import Wrapper from "@/Components/Wrapper";
import { columns } from "./columns";

export default function Budget() {
  const data = [
    {
      category: "Food",
      amount: 100,
      type: "Expense",
    },
  ];

  return (
    <div className="py-20">
      <Wrapper>
        <DataTable columns={columns} data={data} />
      </Wrapper>
    </div>
  );
}
