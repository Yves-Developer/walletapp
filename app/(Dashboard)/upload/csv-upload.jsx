import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/Components/ui/button";
import { sendData } from "../FetchTest/data";
const CSVupload = () => {
  const [result, setResult] = useState([]);
  const fileInputRef = useRef(null);

  const handleCSVupload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (parsedResult) => {
        const data = parsedResult.data;
        setResult(data); // Store parsed data
        console.log("Parsed Data:", data);

        // After successfully parsing the CSV, send the data
        sendData(data)
          .then(() => {
            console.log("Data successfully sent!");
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
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
