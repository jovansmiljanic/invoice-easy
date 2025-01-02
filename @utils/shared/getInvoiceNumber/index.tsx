import { Invoice } from "@types";

// Function to find the biggest invoice number
export const findBiggestInvoiceNumber = (invoices: Invoice[]): number => {
  // Get the current year
  const currentYear = new Date().getFullYear().toString();

  if (invoices.length === 0) {
    // Handle the case where the array is empty
    return 1;
  }

  // Filter invoices for the current year
  const currentYearInvoices = invoices.filter(
    invoice => invoice.year === currentYear
  );

  if (currentYearInvoices.length === 0) {
    // No invoices for the current year, start from 1
    return 1;
  }

  // Use Array.reduce to find the maximum invoice number for the current year
  const maxInvoiceNumber = currentYearInvoices.reduce(
    (max, invoice) =>
      invoice.invoiceNumber > max ? invoice.invoiceNumber : max,
    currentYearInvoices[0].invoiceNumber
  );

  return maxInvoiceNumber + 1;
};
