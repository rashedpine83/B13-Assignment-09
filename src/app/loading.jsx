import { Spinner } from "@heroui/react";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Spinner size="xl" />
      <span className="text-sm text-muted">Wait Loading...</span>
    </div>
  );
};

export default loading;
