export const daysLeft = (paymentDeadline: string) => {
  // Split the payment deadline string into day, month, and year
  const [day, month, year] = paymentDeadline.split("/");

  // Create a new Date object from the year, month (subtract 1 as months are zero-based), and day
  const deadlineDate = new Date(+year, +month - 1, +day);

  // Get the current date
  const today = new Date();

  // Calculate the time difference in milliseconds between the current date and the payment deadline date
  const timeDiff = deadlineDate.getTime() - today.getTime();

  // Convert the time difference to days
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return <>Overdue</>;
  }

  if (daysLeft === 1) {
    return <>{daysLeft} day</>;
  }

  return <>{daysLeft} days</>;
};
