interface TableData {
  name: string;
  description: string;
  cost: string;
  price: string;
  qty: string;
}

export const getTotalPrice = (tableData: TableData[]) => {
  const totalPrice = tableData.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );

  return <>{totalPrice} €</>;
};
