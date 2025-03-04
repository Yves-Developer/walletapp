"use client";

import { DataTable } from "@/Components/ui/data-table";
import { columns } from "./columns";
import Wrapper from "@/Components/Wrapper";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Header from "@/Components/Header";

export default function Transaction() {
  const [data, setData] = useState([]);
  const [txLoading, setTxLoading] = useState(false);
  // Fetch data from the API on mount
  useEffect(() => {
    setTxLoading(true);
    fetch("/api/transaction")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Data fetched:", data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setTxLoading(false));
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
        <Header title="Transaction" />
        <DataTable
          columns={columns}
          data={formattedData}
          action="Export"
          isLoading={txLoading}
        />
      </Wrapper>
    </div>
  );
}
