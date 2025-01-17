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

export function Combobox({ categories, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(""); // State to track the selected category

  const handleSelect = (selectedCategory) => {
    setValue(selectedCategory);
    onSelect(selectedCategory); // Call the onSelect function passed from parent to update state
    setOpen(false);
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
                <Dialog>
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
                          Category Name
                        </Label>
                        <Input
                          id="name"
                          className="col-span-3"
                          placeholder="Enter category Name ..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Category</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CommandItem>
              {categories.map((category, index) => (
                <CommandItem
                  key={index}
                  value={category.name}
                  onSelect={() => handleSelect(category.name)} // Pass selected category to the parent
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
