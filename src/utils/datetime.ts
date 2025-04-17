import { Global } from "@/constants/global";

const getFormattedYearMonth = (date: string, zone: Global["code"]): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();

  if (zone === "en") {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[month]}.${year}`;
  }

  const paddedMonth = String(month + 1).padStart(2, "0");
  return `${year}-${paddedMonth}`;
};

export { getFormattedYearMonth };
