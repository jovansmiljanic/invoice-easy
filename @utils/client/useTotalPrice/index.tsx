// useTotalPrice.js
import { useState, useEffect } from "react";
import { IInvoiceItem } from "@types";

export const useSubTotalPrice = (tableData: IInvoiceItem[]) => {
  return tableData.reduce((acc, item) => acc + +item.price, 0);
};

export const useTotalPrice = (tableData: IInvoiceItem[], tax?: number) => {
  const subTotalPrice = useSubTotalPrice(tableData);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = subTotalPrice;
    if (tax !== undefined && tax !== 0) {
      const taxAmount = (price * tax) / 100;
      price += taxAmount;
    }
    setTotalPrice(price);
  }, [subTotalPrice, tax]);

  const formattedTotalPrice = totalPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedTotalPrice;
};
