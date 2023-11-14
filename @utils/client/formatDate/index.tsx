export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Format the date to a YYYY-MM-DD format
  const isoDate = new Date(date).toLocaleDateString("en-CA", options);

  // Split the date, reverse the components, and join them with dots
  const formattedDate = isoDate.split("-").reverse().join(".");

  return formattedDate;
};
