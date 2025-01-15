import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "./ui/select";
const Modal = ({ btnCaption, title, type }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {type == "Income" ? (
          <Button>{btnCaption}</Button>
        ) : (
          <Button variant="outline">{btnCaption}</Button>
        )}
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
              placeholder="Enter Account Name (required)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="descriotion"
              className="col-span-3"
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
              placeholder="Enter Amount (required)"
              required
            />
          </div>
        </div>
        <div>
          <Combobox />
        </div>
        <div className="grid gap-4 py-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">$1000</SelectItem>
            </SelectContent>
          </Select>
          <DatePicker />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">{title}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
