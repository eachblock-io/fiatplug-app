import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function formatTime(timestamp: any) {
  const date = new Date(timestamp);
  const options = { hour: `2-digit`, minute: `2-digit`, hour12: true };
  const formattedTime = new Intl.DateTimeFormat(`en-US`, options as any).format(
    date
  );

  // Extracting the minute and AM/PM part
  const timeParts = formattedTime.match(/(\d{2}:\d{2})([APMapm]{2})/);
  if (timeParts) {
    return `${timeParts[1]}${timeParts[2].toLowerCase()}`;
  }

  return formattedTime; // fallback
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


