import dayjs from "dayjs";

export const formatNumber = (num: number) => {
  return num.toLocaleString();
};

export const formatDate = (date: string, format?: string) => {
  return dayjs(date).format(format ? format : "YYYY.MM.DD");
};
