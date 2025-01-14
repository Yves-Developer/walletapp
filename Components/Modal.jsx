import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ComboboxDemo } from "./ui/combobox";
import { DatePickerDemo } from "./ui/datepicker";

const Modal = ({ btnCaption, title }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{btnCaption}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your budget here. Click {title} when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex w-full gap-2">
          <ComboboxDemo />
          <DatePickerDemo />
        </div>
        <DialogFooter>
          <Button type="submit">{title}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
