export const formatDate = (date: Date) => {
  const options: any = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = new Date(date).toLocaleDateString("en-GB", options);

  return formattedDate;
};
