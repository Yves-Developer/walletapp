"use client";
import { MoreHorizontal, ArrowUpDown, Trash } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import clsx from "clsx";

// Define columns as a function to accept toast and setData
export const createColumns = (toast, setData) => [
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type");
      const colorClass = type === "Income" ? "text-green-500" : "text-red-500";
      const bgClass = type === "Income" ? "bg-green-500/10" : "bg-red-500/10";
      return (
        <div
          className={clsx(
            "flex items-center justify-center rounded-sm px-4 py-2 font-medium",
            colorClass,
            bgClass
          )}
        >
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "budgetLeft",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BudgetLeft
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const budgetLeft = parseFloat(row.getValue("budgetLeft"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(budgetLeft);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");

      // Define color classes based on status
      let colorClass = "";
      let bgClass = "";

      // Set colors based on the status
      if (status === "Over Budget") {
        colorClass = "text-red-500";
        bgClass = "bg-red-500/10";
      } else if (status === "Under Budget") {
        colorClass = "text-green-500";
        bgClass = "bg-green-500/10";
      } else if (status === "On Budget") {
        colorClass = "text-blue-500";
        bgClass = "bg-blue-500/10";
      } else if (status === "Over Achieved") {
        colorClass = "text-purple-500";
        bgClass = "bg-purple-500/10";
      } else if (status === "Good") {
        colorClass = "text-green-500";
        bgClass = "bg-green-500/10";
      }

      return (
        <div
          className={clsx(
            "flex items-center justify-center rounded-sm px-4 py-2 font-medium",
            colorClass,
            bgClass
          )}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const budget = row.original;

      const handleDelete = async () => {
        try {
          const response = await fetch(
            `/api/category/delete/${budget.category}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete row");
          }

          toast({
            title: "Success",
            description: "Row deleted successfully.",
            variant: "success",
          });

          // Refresh the data by removing the deleted row
          setData((prevData) =>
            prevData.filter((item) => item.category !== budget.category)
          );
        } catch (error) {
          console.error("Error deleting row:", error.message);
          toast({
            title: "Error",
            description: `Failed to delete row: ${error.message}`,
            variant: "destructive",
          });
        }
      };

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete}>
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
