export const formatDate = (date: Date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  return formattedDate;
};
