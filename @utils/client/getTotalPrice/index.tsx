// Core
import { IInvoiceItem } from "@types";
import { useState, useEffect } from "react";

export const getSubTotalPrice = (tableData: IInvoiceItem[]) => {
  const subTotalPrice = tableData
    .reduce((acc, item) => acc + +item.price, 0)
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return `${subTotalPrice}`;
};

export const getTotalPrice = (
  tableData: IInvoiceItem[],
  tax?: number,
  currency?: string
) => {
  const subTotalPrice = tableData.reduce((acc, item) => acc + +item.price, 0);
  const [totalPrice, setTotalPrice] = useState(subTotalPrice);

  useEffect(() => {
    if (tax !== 0 && tax !== undefined) {
      const taxable = (subTotalPrice * tax) / 100;
      setTotalPrice(taxable + subTotalPrice);
    } else {
      setTotalPrice(+subTotalPrice);
    }
  }, [, tax, subTotalPrice]);

  const formattedTotalPrice = `${totalPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}  `;

  return formattedTotalPrice;
};
