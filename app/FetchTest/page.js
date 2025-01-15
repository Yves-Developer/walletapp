"use client";
import { Button } from "@components/ui/Button";
import { useState } from "react";

const FetchTest = () => {
  const [responseMessage, setResponseMessage] = useState("");

  // Sample Data to Send
  const sampleData = {
    userId: "user_123",
    category: "Groceries",
    description: "Weekly shopping",
    account: "Bank Account",
    type: "Expense",
    amount: 50.0,
    date: "2025-01-15",
  };

  const sendData = async () => {
    try {
      const response = await fetch("/api/insertData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleData),
      });

      const data = await response.json();
      setResponseMessage(data.message || data.error);
      console.log(data);
    } catch (error) {
      console.error("Error sending data:", error);
      setResponseMessage("Error sending data.");
    }
  };

  return (
    <div>
      <Button onClick={sendData}>Send Data to API</Button>
      <p>{responseMessage}</p>
    </div>
  );
};

export default FetchTest;
