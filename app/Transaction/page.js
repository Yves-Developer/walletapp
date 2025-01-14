import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
  const demoData = [
    {
      id: "1a2b3c4d",
      amount: 250,
      status: "completed",
      email: "a@example.com",
    },
    {
      id: "2b3c4d5e",
      amount: 150,
      status: "failed",
      email: "b@example.com",
    },
    {
      id: "3c4d5e6f",
      amount: 300,
      status: "pending",
      email: "c@example.com",
    },
    {
      id: "4d5e6f7g",
      amount: 450,
      status: "completed",
      email: "d@example.com",
    },
    {
      id: "5e6f7g8h",
      amount: 500,
      status: "failed",
      email: "e@example.com",
    },
  ];
  for (let i = 6; i <= 35; i++) {
    demoData.push({
      id: `${i}e${i + 1}f${i + 2}g`,
      amount: Math.floor(Math.random() * 500) + 100,
      status: ["pending", "completed", "failed"][Math.floor(Math.random() * 3)],
      email: `${String.fromCharCode(96 + i)}@example.com`,
    });
  }

  data.push(...demoData);

  return (
    <div className="container mx-auto py-20">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
