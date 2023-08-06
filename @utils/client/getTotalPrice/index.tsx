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

export const getTotalPrice = (tableData: TableData[], tax: number = 0) => {
  const subTotalPrice = tableData.reduce((acc, item) => acc + +item.price, 0);

  const totalPrice = +subTotalPrice + +tax;

  return `${totalPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
};
