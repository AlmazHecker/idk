import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const isNotNumberLike = (num: string | number) => {
  return Number.isNaN(+num); // checks, whether num can be converted to number
};
