import { parseISO, isValid, format } from "date-fns";
import { enUS } from "date-fns/locale";

export const dateFormater = (date: any) => {
  return new Date(date).toLocaleDateString(`en-US`, {
    month: `long`,
    year: `numeric`,
  });
};

// export const dateFormaterAndTime = (date: any) => {
//   return format(parseISO(date), `MM/d/yyyy`, { locale: enUS });
// };
export const dateFormaterAndTime = (date: any) => {
  const parsedDate = parseISO(date);

  if (isValid(parsedDate)) {
    return format(parsedDate, `MM/d/yyyy`, { locale: enUS });
  } else {
    // Handle invalid date input, e.g., return an error message or default value
    return "Invalid Date";
  }
};

export function formatCurrency(input: number | string): string {
  // Convert input to a number (if it's a string)
  const number: number = typeof input === `string` ? parseFloat(input) : input;

  // Check if the converted input is a valid number
  if (isNaN(number)) {
    return `0.00`; // return a default value
  }

  // Convert the number to a string with two decimal places
  const formattedNumber: string = number.toFixed();

  // Add commas as thousands separators
  const parts: string[] = formattedNumber.toString().split(`.`);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, `,`);

  return parts.join(`.`);
}
