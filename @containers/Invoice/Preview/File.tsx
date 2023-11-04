// Core types
import type { FC } from "react";

// Vendors
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Global types
import { IContentValues, Invoice, MyAccount } from "@types";

// Client utils
import { formatDate, getSubTotalPrice, getTotalPrice } from "@utils/client";

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
    alignItems: "flex-start",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottom: "1px solid black",
  },

  col: {
    width: "100%",
    display: "flex",
    margin: 10,
    flexGrow: 1,
  },

  col2: {
    width: "100%",
    display: "flex",
    textAlign: "right",
    margin: 10,
    flexGrow: 1,
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
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid grey",
  },

  itemName: {
    flex: "0 0 55%",
    paddingRight: 10,
  },

  itemCost: {
    flex: "0 0 15%",
  },

  itemQty: {
    flex: "0 0 15%",
  },

  itemPrice: {
    flex: "0 0 15%",
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
    fontSize: "6px",
  },

  bankInfo: {
    marginTop: 20,
  },

  footer: {
    fontSize: "6px",
    textAlign: "center",
  },
});

interface File {
  invoice: Invoice;
  myAccount?: MyAccount;
  content?: IContentValues;
}

const index: FC<File> = ({ myAccount, invoice, content }) => {
  return (
    <Document>
      <Page size="A4" style={styles.newInvoice}>
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

            {content?.bic === "" && (
              <Text>
                {content?.bic}: {myAccount?.bic}
              </Text>
            )}

            <Text>
              {content?.email}: {myAccount?.email}
            </Text>
            <Text>
              {content?.phone}: {myAccount?.phoneNumber}
            </Text>

            {myAccount?.registrationNumber && (
              <Text>
                {content?.registrationNumber}: {myAccount?.registrationNumber}
              </Text>
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
            {content?.registrationNumber && (
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
              {content?.dateFrom}: {formatDate(invoice.startDate)}
            </Text>
            <Text>
              {content?.dateTo}: {formatDate(invoice.endDate)}
            </Text>
            <Text>
              {content?.paymentDeadline}: {formatDate(invoice.paymentDeadline)}
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.itemsHeader}>
            <Text style={styles.itemName}>{content?.item}</Text>
            <Text style={styles.itemCost}>{content?.cost}</Text>
            <Text style={styles.itemQty}>{content?.qty}</Text>
            <Text style={styles.itemPrice}>{content?.price}</Text>
          </View>

          <View>
            {invoice.items.map((item, i) => (
              <View key={i} style={styles.itemsTable}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCost}>
                  {isNaN(Number(item.cost))
                    ? "Invalid cost"
                    : Number(item.cost).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </Text>
                <Text style={styles.itemQty}>{item.qty}</Text>
                <Text style={styles.itemPrice}>
                  {item.price.toLocaleString(undefined, {
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
            {content?.subTotal}: {getSubTotalPrice(invoice.items)}
          </Text>

          {invoice.tax && (
            <Text>
              {content?.tax}: {invoice.tax}%
            </Text>
          )}

          <Text>
            {content?.total}:{" "}
            {getTotalPrice(invoice.items, invoice.tax, content?.currency)}
          </Text>
        </View>

        <View style={styles.note}>
          <Text>{content?.ddvParagraphOne}</Text>
          <Text>{content?.ddvParagraphTwo}</Text>

          <Text style={styles.bankInfo}>
            {content?.footerParagrapOne} {" " + myAccount?.bankName},{" "}
            {content?.footerParagrapTwo} {myAccount?.trr}.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            {myAccount?.companyField}, {myAccount?.companyName}.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export { index as File };
