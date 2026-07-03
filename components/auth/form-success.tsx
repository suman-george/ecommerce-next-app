import { AlertCircle, CheckCircle, CheckCircle2 } from "lucide-react";
import React from "react";

const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-green-700 p-3 rounded-md flex items-center gap-3">
      <CheckCircle2 className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
