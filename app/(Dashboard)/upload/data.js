export const sendData = async (dataObject, toast) => {
  try {
    const response = await fetch("/api/category", {
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

    toast({
      title: "Success",
      description: resData.message,
      variant: "success",
    });
    if (resData.error) {
      toast({
        title: "Success",
        description: resData.error,
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error("Error sending data:", error.message);

    toast({
      title: "Error",
      description: `Failed to send data: ${error.message}`,
      status: "error",
      variant: "destructive",
    });
  }
};
