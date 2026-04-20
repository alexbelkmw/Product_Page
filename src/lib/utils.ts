import type { User } from "@/api/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showUser = () => {
  const userData: User | null = JSON.parse(
    localStorage.getItem("user") ?? JSON.stringify({}),
  );

  return userData;
};
