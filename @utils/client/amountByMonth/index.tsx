// import { Invoice } from "@types";

// import { DateTime } from "luxon";

// export const getTotalAmountsByMonth = (invoices?: Invoice[]) => {
//   if (!invoices) {
//     return {};
//   }

//   const totalAmountsByMonth: Record<string, number> = {};
//   const currentDate = new Date();
//   const sixMonthsAgo = new Date(
//     currentDate.setMonth(currentDate.getMonth() - 9)
//   );

//   // Reconstructured invoices with a total and a month
//   const newInvoices = invoices.map(invoice => ({
//     month: DateTime.fromISO(String(invoice.startDate), {
//       zone: "utc",
//     }).toFormat("yyyy-MM"),
//     total: invoice.items.reduce((total, item) => total + Number(item.price), 0),
//   }));

//   // Group invoices by yyyy-MM into an object
//   const groupedInvoices = newInvoices.reduce((acc, invoice) => {
//     if (!acc[invoice.month]) {
//       acc[invoice.month] = [];
//     }
//     acc[invoice.month].push(invoice);
//     return acc;
//   }, {});

//   invoices.forEach(invoice => {
//     // const invoiceDate = new Date(invoice.startDate);
//     const date = DateTime.fromISO(String(invoice.startDate), {
//       zone: "utc",
//     });

//     // Check if the invoice is within the last six months
//     const sixMonthsAgo = DateTime.now().minus({ months: 6 });

//     if (date >= sixMonthsAgo) {
//     }

//     // if (invoiceDate >= sixMonthsAgo) {
//     //   const yearMonth = `${invoiceDate.getFullYear()}-${String(
//     //     invoiceDate.getMonth() + 1
//     //   ).padStart(2, "0")}`;

//     //   const totalAmount = invoice.items.reduce(
//     //     (total, item) => total + Number(item.price),
//     //     0
//     //   );

//     //   totalAmountsByMonth[yearMonth] =
//     //     (totalAmountsByMonth[yearMonth] || 0) + totalAmount;
//     // }
//   });

//   return Object.fromEntries(
//     Object.entries(totalAmountsByMonth).sort(
//       (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
//     )
//   );
// };
