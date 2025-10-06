"use client";
import { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      {...props}
    />
  );
};
