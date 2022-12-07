import React from "react";

const ErrorMessage = ({ errors }: { errors?: string[] }) => {
  if (!errors) return null;

  return (
    <label className="label">
      <span className="label-text-alt text-red-700">{errors.join(". ")}</span>
    </label>
  );
};

export default ErrorMessage;
