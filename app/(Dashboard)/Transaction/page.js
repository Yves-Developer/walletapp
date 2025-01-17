"use client";

import { DataTable } from "@/Components/ui/data-table";
import { columns } from "./columns";
import Wrapper from "@/Components/Wrapper";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Transaction() {
  const [data, setData] = useState([]);

  // Fetch data from the API on mount
  useEffect(() => {
    fetch("/api/transaction")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Data fetched:", data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formattedData = data.map((item) => ({
    category: item.category || "N/A",
    description: item.description || "N/A",
    account: item.account || "N/A",
    date: item.date ? format(new Date(item.date), "PPP") : "Invalid date",
    type: item.type,
    amount: item.amount,
  }));

  return (
    <div className="py-20">
      <Wrapper>
        <DataTable columns={columns} data={formattedData} action="Export" />
      </Wrapper>
    </div>
  );
}
