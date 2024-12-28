import { format } from "date-fns";

export const formatDate = (date?: string | Date) => {
  return format(new Date(date as string), "HH:mm");
};

export const get24HDay = (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);

  return [startOfDay, endOfDay];
};
