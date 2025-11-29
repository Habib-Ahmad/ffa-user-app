import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  dateString: string,
  formatStr: string = "MMMM dd, yyyy"
) {
  try {
    return format(new Date(dateString), formatStr);
  } catch {
    return dateString;
  }
}
