export const sendData = async (dataObject) => {
  try {
    const response = await fetch("/api/insertData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject), // Send the object directly
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resData = await response.json();
    console.log("Server response:", resData);
  } catch (error) {
    console.error("Error sending data:", error.message);
  }
};
