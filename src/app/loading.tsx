import Loader from "@/components/shared/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default loading;
