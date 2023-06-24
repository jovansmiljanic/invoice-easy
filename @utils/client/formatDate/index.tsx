export const formatDate = (date: Date) => {
  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = new Date(date).toLocaleDateString("en-GB", options);

  return formattedDate;
};
