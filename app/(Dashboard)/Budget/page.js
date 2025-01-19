"use client";

import { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "./columns";
import { useToast } from "@/hooks/use-toast";
import Header from "@/Components/Header";

export default function Budget() {
  const { toast } = useToast();
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
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setBudgetLoading(false));
  }, []);

  const columns = createColumns(toast, setData); // Pass toast and setData to columns

  return (
    <div className="py-20">
      <Wrapper>
        <Header title="Set/Load Budget" />
        <DataTable columns={columns} data={data} isLoading={budgetLoading} />
      </Wrapper>
    </div>
  );
}
