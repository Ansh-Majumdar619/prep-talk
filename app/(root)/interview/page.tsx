import Agent from "@/components/Agent";
import React from "react";

const Page = () => {
  return (
    <>
      <div>
        <h3 className="mb-5" >Interview Generation</h3>
        <Agent userName="You" userId="user1" type="generate" />
      </div>
    </>
  );
};

export default Page;




