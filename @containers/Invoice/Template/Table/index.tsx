// Core types
import type { FC, ChangeEvent } from "react";

// Core
import { useContext, useState } from "react";

// Global styles
import { Field, Label } from "@styles/Form";

// Global components
import { Button } from "@components";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// ICon
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

// Store context
import { StoreContext } from "@context";

// Global types
import { IInvoiceItem, Product } from "@types";

const Table = styled.div``;

const Head = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;

  ${({ theme: { colors, font } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Item = styled.div`
  padding: 15px;

  &:nth-child(1) {
    flex: 0 0 50%;
  }

  &:nth-child(2) {
    flex: 0 0 15%;
  }

  &:nth-child(3) {
    flex: 0 0 15%;
  }

  &:nth-child(4) {
    flex: 0 0 15%;
  }

  &:nth-child(5) {
    padding: 0;
    flex: 0 0 5%;
    cursor: pointer;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      padding: 10px 5px;
    }
  `}
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${Item} {
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme: { breakpoints } }) => css`
      @media (max-width: ${breakpoints.md}px) {
        flex-direction: column;
        align-items: flex-start;
      }
    `}
  }
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

interface Table {
  tableData: IInvoiceItem[];
  setTableData: (tableData: IInvoiceItem[]) => void;
}

const index: FC<Table> = ({ tableData, setTableData }) => {
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);

  // Translation
  const { t } = useTranslation();

  // Function to call the API and fetch products
  const fetchProducts = async (searchTerm: string) => {
    const response = await fetch(`/api/products?name=${searchTerm}`);
    const products = await response.json();
    setProductSuggestions(products);
  };

  // Function to handle input changes in each cell
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof IInvoiceItem
  ): void => {
    const newData: IInvoiceItem[] = [...tableData];

    // Use type assertion to indicate the type of newData[index][field]
    (newData[index][field] as string) = e.target.value;

    // Calculate the price
    const cost = newData[index].cost;
    const qty = newData[index].qty;

    if (!isNaN(cost) && !isNaN(qty)) {
      newData[index].price = cost * qty;
    } else {
      newData[index].price = 0;
    }

    setTableData(newData);

    // If the name field is changed, fetch products
    if (field === "name") {
      console.log(e.target.value);
    }
  };

  // const handleProductSelect = (product: Product, index: number): void => {
  //   const newData = [...tableData];
  //   newData[index].name = product.name;
  //   newData[index].cost = product.price; // Assuming 'cost' should be filled with 'price' from the product
  //   newData[index].price = product.price; // Assuming this is the correct field to update
  //   // Call other functions if needed to update qty and calculate final price
  //   setTableData(newData);
  // };

  // Function to handle adding a new row
  const addRow = () => {
    setTableData([
      ...tableData,
      {
        name: "",
        cost: 0,
        qty: 0,
        price: 0,
      },
    ]);
  };

  // Function to handle item removal
  const removeItem = (index: number) => {
    const updatedInvoices = [...tableData];

    updatedInvoices.splice(index, 1);
    setTableData(updatedInvoices);
  };

  // Store context
  const { isPhone } = useContext(StoreContext);

  return (
    <>
      {!isPhone ? (
        <Table>
          <Head>
            <Item>{t("invoice:item")}</Item>
            <Item>{t("invoice:cost")}</Item>
            <Item>{t("invoice:qty")}</Item>
            <Item>{t("invoice:price")}</Item>
          </Head>

          <Body>
            {tableData.map((row, index) => (
              <Wrap key={index}>
                <Item>
                  <Field
                    type="text"
                    name="name"
                    placeholder={t("invoice:item")}
                    onChange={e => handleInputChange(e, index, "name")}
                    value={row.name}
                  />
                </Item>

                <Item>
                  <Field
                    type="number"
                    name="cost"
                    placeholder={t("invoice:cost")}
                    onChange={e => handleInputChange(e, index, "cost")}
                    value={row.cost}
                  />
                </Item>

                <Item>
                  <Field
                    type="number"
                    name="qty"
                    placeholder={t("invoice:qty")}
                    onChange={e => handleInputChange(e, index, "qty")}
                    value={row.qty}
                  />
                </Item>

                <Item>
                  <Field
                    type="number"
                    name="price"
                    disabled
                    placeholder="00.00"
                    onChange={e => handleInputChange(e, index, "price")}
                    value={row.price}
                  />
                </Item>

                <Item>
                  {index !== 0 && (
                    <RemoveCircleOutlineOutlinedIcon
                      color="error"
                      onClick={() => removeItem(index)}
                    />
                  )}
                </Item>
              </Wrap>
            ))}
          </Body>
        </Table>
      ) : (
        <Table>
          <Body>
            {tableData.map((row, index) => (
              <Wrap key={index}>
                <Item>
                  <Label>{t("invoice:item")}</Label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Item"
                    onChange={e => handleInputChange(e, index, "name")}
                    value={row.name}
                  />
                </Item>

                <Item>
                  <Label>{t("invoice:cost")}</Label>
                  <Field
                    type="number"
                    name="cost"
                    placeholder="Cost"
                    onChange={e => handleInputChange(e, index, "cost")}
                    value={row.cost}
                  />
                </Item>

                <Item>
                  <Label>{t("invoice:qty")}</Label>
                  <Field
                    type="number"
                    name="qty"
                    placeholder="QTY"
                    onChange={e => handleInputChange(e, index, "qty")}
                    value={row.qty}
                  />
                </Item>

                <Item>
                  <Label>{t("invoice:price")}</Label>
                  <Field
                    type="number"
                    name="price"
                    disabled
                    placeholder="00.00"
                    onChange={e => handleInputChange(e, index, "price")}
                    value={row.price}
                  />
                </Item>

                <Item>
                  {index !== 0 && (
                    <RemoveCircleOutlineOutlinedIcon
                      color="error"
                      onClick={() => removeItem(index)}
                    />
                  )}
                </Item>
              </Wrap>
            ))}
          </Body>
        </Table>
      )}

      <Button
        type="button"
        variant="secondary"
        size="small"
        margin={{
          xs: { top: 1, bottom: 1, left: 2 },
          sm: { top: 1, bottom: 1, left: 2 },
          md: { top: 1, bottom: 1, left: 2 },
        }}
        onClick={addRow}
      >
        {t("invoice:addNewCta")}
      </Button>
    </>
  );
};

export { index as Table };
