import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import clsx from "clsx";
const SummaryCard = ({
  description,
  amount,
  util,
  budget,
  isIncome,
  color,
  utilValue,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <h3>{description}</h3>
          <span className={isIncome ? "text-green-600" : "text-red-600"}>
            {isIncome ? `+${amount}` : `-${amount}`}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-1 bg-gray-300">
          <div
            className={clsx("h-full", color)}
            style={{ width: `${util}%` }}
          ></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <h3>
          {isIncome ? "Achieved:" : "Utilisation:"}
          {utilValue}%
        </h3>
        <span>Budget: {budget}</span>
      </CardFooter>
    </Card>
  );
};

export default SummaryCard;
