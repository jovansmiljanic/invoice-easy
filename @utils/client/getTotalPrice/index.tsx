interface TableData {
  name: string;
  cost: number;
  price: number;
  qty: number;
}

export const getTotalPrice = (tableData: TableData[]) => {
  const totalPrice = tableData.reduce((acc, item) => acc + +item.price, 0);

  return totalPrice;
};
