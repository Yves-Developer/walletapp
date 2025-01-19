"use client";
import { useState, useEffect } from "react";
import Wrapper from "@/Components/Wrapper";
import { DataTable } from "@/Components/ui/data-table";
import { columns } from "./columns";
export default function Budget() {
  const [data, setData] = useState([]);
  const [budgetLoading, setBudgetLoading] = useState(false);

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
        console.log("Data fetched:", formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setBudgetLoading(false));
  }, []);

  return (
    <div className="py-20">
      <Wrapper>
        <DataTable columns={columns} data={data} isLoading={budgetLoading} />
      </Wrapper>
    </div>
  );
}
