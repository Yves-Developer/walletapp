"use client";

import Wrapper from "@/Components/Wrapper";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
const Report = () => {
  const { userId } = useAuth();
  const { toast } = useToast();

  if (!userId) {
    return <div className="p-20">Loading...</div>;
  }
  return (
    <Wrapper>
      <div className="p-20">
        <Button
          onClick={() => {
            toast({
              title: "Success",
              description: "Your action was successful.",
              variant: "success", // Green toast for success
            });
          }}
        >
          Show Success Toast
        </Button>
      </div>
    </Wrapper>
  );
};

export default Report;
