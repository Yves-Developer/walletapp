"use client";

import { useState } from "react";
import Papa from "papaparse";

const CSVUploader = () => {
  const [result, setResult] = useState({ income: [], expense: [] });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // Read headers
      skipEmptyLines: true, // Skip empty rows
      complete: (result) => {
        const data = result.data;

        // Group expense and income
        const income = [];
        const expense = [];

        data.forEach((row) => {
          const { category, type, amount } = row;

          // Parse the amount into a number (remove formatting if needed)
          const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ""));

          if (type === "income") {
            income.push({ category, amount: numericAmount });
          } else if (type === "expense") {
            expense.push({ category, amount: numericAmount });
          }
        });

        setResult({ income, expense });
        console.log("Income:", income);
        console.log("Expense:", expense);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  return (
    <div className="p-20">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div>
        <h3>Income:</h3>
        <pre>{JSON.stringify(result.income, null, 2)}</pre>
        <h3>Expense:</h3>
        <pre>{JSON.stringify(result.expense, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CSVUploader;
