// Core types
import type { FC } from "react";

// Vendors
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Global types
import { IContentValues, Invoice, MyAccount } from "@types";

// Client utils
import { formatDate, useSubTotalPrice, useTotalPrice } from "@utils/client";

// Font
Font.register({
  family: "Public Sans",
  fonts: [
    { src: "/fonts/PublicSans-Regular.ttf" },
    { src: "/fonts/PublicSans-Bold.ttf" },
  ],
});

// Create styles
const styles = StyleSheet.create({
  newInvoice: {
    borderRadius: "5px",
    backgroundColor: "white",
    width: "100%",
    fontSize: "10px",
    lineHeight: 1.5,
    fontFamily: "Public Sans",
  },

  details: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottom: "1px solid black",
  },

  col: {
    flex: "0 0 50%",
    display: "flex",
    margin: 10,
  },

  logoCol: {
    flex: "0 0 40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  col2: {
    margin: 10,
  },

  image: {
    width: "80px",
    marginBottom: 10,
  },

  name: {
    fontSize: "12px",
    fontWeight: "ultrabold",
  },

  invoiceName: {
    fontSize: "12px",
    fontWeight: "ultrabold",
    marginBottom: 10,
  },

  itemsHeader: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid black",
  },

  itemsTable: {
    paddingHorizontal: 30,
    paddingVertical: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid grey",
  },

  itemName: {
    flex: "0 0 50%",
    paddingRight: 20,
    paddingLeft: 5,
  },

  itemCost: {
    flex: "0 0 15%",
  },

  itemQty: {
    flex: "0 0 12.5%",
    textAlign: "center",
  },

  itemNo: {
    flex: "0 0 5%",
    textAlign: "left",
  },

  itemPrice: {
    flex: "0 0 15%",
    paddingLeft: 10,
  },

  total: {
    paddingHorizontal: 50,
    paddingVertical: 30,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },

  note: {
    width: "80%",
    margin: "auto",
    fontSize: "9px",
  },

  bankInfo: {
    marginTop: 20,
  },

  footer: {
    fontSize: "10px",
    textAlign: "center",
  },

  sign: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  colOne: {
    width: "50%",
    display: "flex",
    margin: 10,
    flexGrow: 1,
    fontSize: "10px",
  },

  colSign: {
    width: "50%",
    display: "flex",
    textAlign: "left",
    margin: 10,
    flexGrow: 1,
    fontSize: "10px",
  },

  border: {
    width: "200px",
    borderBottom: "1px solid black",
    marginBottom: "3px",
  },
});

interface File {
  invoice: Invoice;
  myAccount?: MyAccount | null;
  content?: IContentValues;
}

const index: FC<File> = ({ myAccount, invoice, content }) => {
  const totalPrice = useTotalPrice(invoice.items, invoice.tax);
  const subTotalPrice = useSubTotalPrice(invoice.items);

  return (
    <Document>
      <Page size="A4" style={styles.newInvoice}>
        {myAccount?.logo ? (
          <>
            <View style={styles.details}>
              <View style={styles.logoCol}>
                <Image src={myAccount.logo} style={styles.image} />

                <Text style={styles.name}>{myAccount?.companyName}</Text>
              </View>

              <View style={styles.col2}>
                <Text>
                  {content?.taxNumber}: {myAccount?.taxNumber}
                </Text>

                {myAccount?.registrationNumber && (
                  <Text>
                    {content?.registrationNumber}:{" "}
                    {myAccount?.registrationNumber}
                  </Text>
                )}

                <Text>
                  {content?.trr}: {myAccount?.trr}
                </Text>

                {myAccount?.bic && (
                  <Text>
                    {content?.bic}: {myAccount?.bic}
                  </Text>
                )}

                <Text>
                  {myAccount?.companyAddress}, {myAccount?.zipCode},{" "}
                  {myAccount?.city}, {myAccount?.country}
                </Text>

                <Text>
                  {content?.email}: {myAccount?.email}
                </Text>

                <Text>
                  {content?.phone}: {myAccount?.phoneNumber}
                </Text>
              </View>
            </View>

            <View style={styles.details}>
              <View style={styles.col}>
                <Text style={styles.name}>{invoice.client.clientName}</Text>
                <Text>{invoice.client.clientAddress}</Text>
                <Text>
                  {myAccount?.zipCode}, {myAccount?.city}, {myAccount?.country}
                </Text>
                <Text>
                  {content?.taxNumber}: {invoice.client.taxNumber}
                </Text>

                {invoice.client.registrationNumber ? (
                  <Text>
                    {content?.registrationNumber}:{" "}
                    {invoice.client.registrationNumber}
                  </Text>
                ) : (
                  <></>
                )}
              </View>

              <View style={styles.col2}>
                <Text style={styles.invoiceName}>
                  {content?.invoice}: #{invoice.invoiceNumber}
                </Text>
                <Text>
                  {content?.dateFrom}: {formatDate(invoice.startDate)}
                </Text>
                <Text>
                  {content?.dateTo}: {formatDate(invoice.endDate)}
                </Text>
                <Text>
                  {content?.paymentDeadline}:{" "}
                  {formatDate(invoice.paymentDeadline)}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.details}>
              <View style={styles.col}>
                <Text style={styles.name}>{myAccount?.companyName}</Text>
                <Text>{myAccount?.companyAddress}</Text>
                <Text>
                  {myAccount?.zipCode}, {myAccount?.city}, {myAccount?.country}
                </Text>
                <Text>
                  {content?.taxNumber}: {myAccount?.taxNumber}
                </Text>
              </View>

              <View style={styles.col2}>
                <Text>
                  {content?.trr}: {myAccount?.trr}
                </Text>

                {myAccount?.bic ? (
                  <Text>
                    {content?.bic}: {myAccount?.bic}
                  </Text>
                ) : (
                  <></>
                )}

                <Text>
                  {content?.email}: {myAccount?.email}
                </Text>
                <Text>
                  {content?.phone}: {myAccount?.phoneNumber}
                </Text>

                {myAccount?.registrationNumber ? (
                  <Text>
                    {content?.registrationNumber}:{" "}
                    {myAccount?.registrationNumber}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
            </View>

            <View style={styles.details}>
              <View style={styles.col}>
                <Text style={styles.name}>{invoice.client.clientName}</Text>
                <Text>{invoice.client.clientAddress}</Text>
                <Text>
                  {myAccount?.zipCode}, {myAccount?.city}, {myAccount?.country}
                </Text>
                <Text>
                  {content?.taxNumber}: {invoice.client.taxNumber}
                </Text>

                {invoice.client.registrationNumber && (
                  <Text>
                    {content?.registrationNumber}:{" "}
                    {invoice.client.registrationNumber}
                  </Text>
                )}
              </View>

              <View style={styles.col2}>
                <Text style={styles.invoiceName}>
                  {content?.invoice}: #{invoice.invoiceNumber}
                </Text>
                <Text>
                  {content?.dateFrom}: {myAccount?.city},{" "}
                  {formatDate(invoice.startDate)}.
                </Text>
                <Text>
                  {content?.dateTo}: {formatDate(invoice.endDate)}.
                </Text>
                <Text>
                  {content?.paymentDeadline}:{" "}
                  {formatDate(invoice.paymentDeadline)}.
                </Text>
              </View>
            </View>
          </>
        )}

        <View>
          <View style={styles.itemsHeader}>
            <Text style={styles.itemNo}>{content?.no}</Text>
            <Text style={styles.itemName}>{content?.item}</Text>
            <Text style={styles.itemCost}>{content?.cost}</Text>
            <Text style={styles.itemQty}>{content?.qty}</Text>
            <Text style={styles.itemQty}>{content?.unit}</Text>
            <Text style={styles.itemPrice}>{content?.price}</Text>
          </View>

          <View>
            {invoice.items.map((item, i) => (
              <View key={i} style={styles.itemsTable}>
                <Text style={styles.itemNo}>{i + 1}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCost}>
                  {isNaN(Number(item.cost))
                    ? "Invalid cost"
                    : Number(item.cost).toLocaleString("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </Text>
                <Text style={styles.itemQty}>{item.qty}</Text>
                <Text style={styles.itemQty}>Kom</Text>
                <Text style={styles.itemPrice}>
                  {item.price.toLocaleString("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.total}>
          <Text>
            {content?.subTotal}: {subTotalPrice} {content?.currency}
          </Text>

          {invoice.tax ? (
            <Text>
              {content?.tax}: {invoice.tax}%
            </Text>
          ) : (
            <></>
          )}

          <Text>
            {content?.total}: {totalPrice} {content?.currency}
          </Text>
        </View>

        <View style={styles.note}>
          <Text>{content?.ddvParagraphOne}</Text>
          <Text>{content?.ddvParagraphTwo}</Text>
        </View>

        {myAccount?.signInvoice ? (
          <View style={styles.details}>
            <View style={styles.colSign}>
              <Text style={styles.border} />
              <Text>Fakturu izdao</Text>
            </View>

            <View style={styles.colSign}>
              <Text style={styles.border} />
              <Text>Fakturu primio</Text>
            </View>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.footer}>
          <Text>{myAccount?.companyName}.</Text>
        </View>
      </Page>
    </Document>
  );
};

export { index as File };
