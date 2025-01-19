"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./dialog";
import { Label } from "./label";
import { Input } from "./input";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./skeleton";
export function Combobox({ categories, onSelect, setBudgetAmount, type }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(""); // State to track the selected category
  const [newCategory, setNewCategory] = React.useState("");
  const [newCatLoading, setNewCatLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleSelect = (selectedCategory, categoryBudget) => {
    setValue(selectedCategory);
    onSelect(selectedCategory); // Call the onSelect function passed from parent to update state
    if (type === "Expense") {
      setBudgetAmount(categoryBudget);
    }
    setOpen(false);
  };
  const handleSubmit = async () => {
    // Validation
    if (!newCategory && newCategory === "") {
      toast({
        title: "Validation Error",
        description: "Please provide a valid category name.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      category: newCategory,
      amount: 0,
    };

    toast({
      title: "Warning!",
      description: "New Category will have zero (0) budget.",
      variant: "default",
    });

    try {
      setNewCatLoading(true);
      const response = await fetch(`/api/category/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit data.");
      }

      const result = await response.json();

      toast({
        title: "Submission Successful",
        description: `${result.message}`,
        variant: "success",
      });
      setIsModalOpen(false);
      if (result.error) {
        toast({
          title: "Submission Failed",
          description: `${result.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          error.message || "An error occurred while submitting data.",
        variant: "destructive",
      });
    } finally {
      setNewCatLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((category) => category.name === value)?.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost">Add new category</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                          Category
                        </Label>
                        {newCatLoading ? (
                          <p>Loading...</p>
                        ) : (
                          <Input
                            id={newCategory}
                            className="col-span-3"
                            placeholder="Enter category Name ..."
                            onChange={(e) => setNewCategory(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" onClick={handleSubmit}>
                        Add Category
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CommandItem>
              {categories.map((category, index) => (
                <CommandItem
                  key={index}
                  value={category.name}
                  onSelect={() => handleSelect(category.name, category.amount)} // Pass selected category to the parent
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
