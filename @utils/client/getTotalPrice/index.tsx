import { useState, useEffect } from "react";

interface TableData {
  name: string;
  cost: number;
  price: number;
  qty: number;
}

export const getSubTotalPrice = (tableData: TableData[]) => {
  const subTotalPrice = tableData
    .reduce((acc, item) => acc + +item.price, 0)
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return `${subTotalPrice} €`;
};

export const getTotalPrice = (tableData: TableData[], tax?: number) => {
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
  })} €`;

  return formattedTotalPrice;
};
