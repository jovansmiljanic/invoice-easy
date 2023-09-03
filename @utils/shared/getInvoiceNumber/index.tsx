import { Invoice } from "@types";

// Function to find the biggest invoice number
export const findBiggestInvoiceNumber = (
  invoices: Invoice[]
): number | null => {
  if (invoices.length === 0) {
    // Handle the case where the array is empty
    return 1;
  }

  // Use Array.reduce to find the maximum invoice number
  const maxInvoiceNumber = invoices.reduce((max, invoice) => {
    if (invoice.invoiceNumber > max) {
      return invoice.invoiceNumber;
    } else {
      return max;
    }
  }, invoices[0].invoiceNumber);

  return maxInvoiceNumber + 1;
};
