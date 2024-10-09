// useTotalPrice.js
import { useState, useEffect } from "react";
import { IInvoiceItem } from "@types";

export const useSubTotalPrice = (tableData: IInvoiceItem[]) => {
  return tableData?.reduce((acc, item) => acc + +item.price, 0);
};

export const useTotalPrice = (
  tableData: IInvoiceItem[],
  tax?: number,
  discount?: number
) => {
  const subTotalPrice = useSubTotalPrice(tableData);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = subTotalPrice;

    // Apply discount if provided and greater than 0
    if (discount !== undefined && discount > 0) {
      const discountAmount = (price * discount) / 100;
      price -= discountAmount;
    }

    // Apply tax if provided and greater than 0
    if (tax !== undefined && tax > 0) {
      const taxAmount = (price * tax) / 100;
      price += taxAmount;
    }

    setTotalPrice(price);
  }, [subTotalPrice, tax, discount]);

  const formattedTotalPrice = totalPrice.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedTotalPrice;
};
