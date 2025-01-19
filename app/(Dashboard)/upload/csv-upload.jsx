import { Upload } from "lucide-react";
import { useRef } from "react";
import Papa from "papaparse";
import { Button } from "@/Components/ui/button";
import { sendData } from "./data";
import { useToast } from "@/hooks/use-toast";
const CSVupload = () => {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const handleCSVupload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (parsedResult) => {
        const data = parsedResult.data;

        // Validation
        const requiredHeaders = ["category", "type", "amount"];
        const fileHeaders = Object.keys(data[0] || {});
        const missingHeaders = requiredHeaders.filter(
          (header) => !fileHeaders.includes(header)
        );

        if (missingHeaders.length > 0) {
          toast({
            title: "Invalid CSV",
            description: `Missing required headers: ${missingHeaders.join(
              ", "
            )}`,
            variant: "destructive",
          });
          return;
        }

        // Check for unique categories
        const categorySet = new Set();
        const duplicateCategories = [];

        for (const row of data) {
          const { category } = row;

          if (!category) {
            toast({
              title: "Validation Error",
              description: "Empty category found in the CSV.",
              variant: "destructive",
            });
            return;
          }

          if (categorySet.has(category)) {
            duplicateCategories.push(category);
          } else {
            categorySet.add(category);
          }
        }

        if (duplicateCategories.length > 0) {
          toast({
            title: "Duplicate Categories",
            description: `Duplicate categories found: ${duplicateCategories.join(
              ", "
            )}`,
            variant: "destructive",
          });
          return;
        }

        // If all validations pass, send data to the API
        console.log("Validated Data:", data);

        sendData(data, toast).catch((error) => {
          console.error("Error sending data:", error);
          toast({
            title: "Error",
            description: "Failed to send data to the server.",
            variant: "destructive",
          });
        });
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        toast({
          title: "Parsing Error",
          description: "There was an error parsing the CSV file.",
          variant: "destructive",
        });
      },
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  return (
    <>
      <Button variant="outline" className="ml-auto" onClick={triggerFileInput}>
        <Upload />
        Load CSV
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".csv"
        onChange={handleCSVupload}
      />
    </>
  );
};

export default CSVupload;
