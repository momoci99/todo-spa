import dayjs from "dayjs";

export const useDataFormatter = () => {
  const convertDate = (date: string) => {
    return dayjs(date).format("YYYY/MM/DD");
  };

  return {
    convertDate,
  };
};
