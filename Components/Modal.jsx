"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combobox";
import { DatePicker } from "./ui/datepicker";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
const Modal = ({ btnCaption, title, type }) => {
  const { userId } = useAuth();
  const [account, setAccount] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, pickDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cat, setCat] = useState("");

  const fetchData = async (type) => {
    if (!type) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/category/${type}`);
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    fetchData(type);
  };

  const handleSubmit = async () => {
    const payload = {
      userId,
      account,
      description,
      amount: parseFloat(amount),
      category: cat,
      type,
      date: selectedDate,
    };
    console.log(payload);

    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      setIsModalOpen(false); // Close the modal on successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant={type === "Income" ? "default" : "outline"}
          onClick={handleModalOpen}
        >
          {btnCaption}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="account" className="text-left">
              Account Name
            </Label>
            <Input
              id="account"
              className="col-span-3"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="Enter Account Name (required)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description (Optional)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-left">
              Amount
            </Label>
            <Input
              type="number"
              id="amount"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount (required)"
              required
            />
          </div>
        </div>
        <div>
          <Combobox categories={category} onSelect={setCat} />
        </div>
        <div className="grid gap-4 py-4">
          <DatePicker onPick={pickDate} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
