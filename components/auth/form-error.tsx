import { AlertCircle } from "lucide-react";
import React from "react";

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-red-500 p-3 rounded-md flex gap-3 items-center">
      <AlertCircle className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
