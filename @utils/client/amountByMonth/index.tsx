// GLobal types
import { Invoice } from "@types";

export const getTotalAmountsByMonth = (invoices?: Invoice[]) => {
  const totalAmountsByMonth: Record<string, number> = {};

  const currentDate = new Date();

  invoices?.forEach((invoice) => {
    const date = new Date(invoice.startDate);

    // Check if the invoice's start date is within the last 6 months from the current date
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 12);

    if (date >= sixMonthsAgo) {
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

      const totalAmount = invoice.items.reduce(
        (total, item) => +total + +item.price,
        0
      );

      if (totalAmountsByMonth.hasOwnProperty(yearMonth)) {
        totalAmountsByMonth[yearMonth] += totalAmount;
      } else {
        totalAmountsByMonth[yearMonth] = totalAmount;
      }
    }
  });

  // Custom sorting to sort months chronologically
  const sortedTotalAmountsByMonth: Record<string, number> = {};
  Object.keys(totalAmountsByMonth)
    .sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf())
    .forEach((key) => {
      sortedTotalAmountsByMonth[key] = totalAmountsByMonth[key];
    });

  return sortedTotalAmountsByMonth;
};
