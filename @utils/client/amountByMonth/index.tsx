import { Invoice } from "@types";

export const getTotalAmountsByMonth = (invoices?: Invoice[]) => {
  if (!invoices) {
    return {};
  }

  const totalAmountsByMonth: Record<string, number> = {};
  const currentDate = new Date();
  const sixMonthsAgo = new Date(
    currentDate.setMonth(currentDate.getMonth() - 9)
  );

  invoices.forEach(invoice => {
    const invoiceDate = new Date(invoice.startDate);

    if (invoiceDate >= sixMonthsAgo) {
      const yearMonth = `${invoiceDate.getFullYear()}-${String(
        invoiceDate.getMonth() + 1
      ).padStart(2, "0")}`;

      const totalAmount = invoice.items.reduce(
        (total, item) => total + Number(item.price),
        0
      );

      totalAmountsByMonth[yearMonth] =
        (totalAmountsByMonth[yearMonth] || 0) + totalAmount;
    }
  });

  return Object.fromEntries(
    Object.entries(totalAmountsByMonth).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    )
  );
};
