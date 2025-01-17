"use client";

import Wrapper from "@/Components/Wrapper";
import { useAuth } from "@clerk/nextjs";

const Report = () => {
  const { userId } = useAuth();

  if (!userId) {
    return <div className="p-20">Loading...</div>;
  }
  return (
    <Wrapper>
      <div className="p-20">Report & userId: {userId}</div>
    </Wrapper>
  );
};

export default Report;
