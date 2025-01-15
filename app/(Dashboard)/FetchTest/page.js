"use client";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

const FetchTest = () => {
  const [responseMessage, setResponseMessage] = useState("");

  // Sample Data to Send
  const sampleData = {
    userId: "user_123",
    category: "Salary",
    description: "Paycheck",
    account: "Paypal",
    type: "Income",
    amount: 500.0,
    date: "2025-04-15",
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
    <div className="px-[100px] py-20">
      <Button onClick={sendData}>Send Data</Button>
      <p>{responseMessage}</p>
    </div>
  );
};

export default FetchTest;
