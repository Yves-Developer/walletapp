import { DateRangePicker } from "./ui/date-range-picker";

const Header = ({ title, setNewDateValue }) => {
  return (
    <div className="flex sm:flex-row sm:items-center justify-between py-6 sm:py-9 w-full bg-background/80 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <DateRangePicker
        onUpdate={(newValues) => {
          setNewDateValue(newValues.range); // Update the date range in parent component (Report)
        }}
        align="start"
        locale="en-GB"
        showCompare={false}
      />
    </div>
  );
};

export default Header;
