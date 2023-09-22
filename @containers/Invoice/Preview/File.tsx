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
import { Invoice, MyAccount } from "@types";

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

  footer: {
    fontSize: "6px",
    textAlign: "center",
  },
});

interface File {
  invoice: Invoice;
  myAccount?: MyAccount;
}

const index: FC<File> = ({ myAccount, invoice }) => {
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
            <Text>Davcna stevilka: {myAccount?.taxNumber}</Text>
          </View>

          <View style={styles.col2}>
            <Text>TRR: {myAccount?.trr}</Text>
            <Text>BIC koda: {myAccount?.bic}</Text>
            <Text>E-pošta: {myAccount?.email}</Text>
            <Text>Telefon: {myAccount?.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.col}>
            <Text style={styles.name}>{invoice.client.clientName}</Text>
            <Text>{invoice.client.clientAddress}</Text>
            <Text>
              {myAccount?.zipCode}, {myAccount?.city}, {myAccount?.country}
            </Text>
            <Text>Davcna stevilka: {invoice.client.taxNumber}</Text>
          </View>

          <View style={styles.col2}>
            <Text style={styles.name}>Invoice: #{invoice.invoiceNumber}</Text>
            <Text>Date from: {formatDate(invoice.startDate)}</Text>
            <Text>Date to: {formatDate(invoice.endDate)}</Text>
            <Text>Payment deadline: {formatDate(invoice.paymentDeadline)}</Text>
          </View>
        </View>

        <View>
          <View style={styles.itemsHeader}>
            <Text style={styles.itemName}>Item</Text>
            <Text style={styles.itemCost}>Cost</Text>
            <Text style={styles.itemQty}>QTY</Text>
            <Text style={styles.itemPrice}>Price</Text>
          </View>

          <View>
            {invoice.items.map((item, i) => (
              <View key={i} style={styles.itemsTable}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCost}>{item.cost}</Text>
                <Text style={styles.itemQty}>{item.qty}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.total}>
          <Text>Subtotal: {getSubTotalPrice(invoice.items)}</Text>
          <Text>Tax: {invoice.tax}%</Text>
          <Text>Total: {getTotalPrice(invoice.items, invoice.tax)}</Text>
        </View>

        <View style={styles.note}>
          <Text>
            DDV ni obračunan na podlagi 1. Odstavka 94. Člena Zakona o davku na
            dodano vrednost. (nisem zavezanec za DDV). PRI POSLOVANJU NE
            UPORABLJAM ŽIGA.
          </Text>

          <Text>
            Znesek računa poravnajte na transakcijski račun odprt pri{" "}
            {" " + myAccount?.bankName}., številka {myAccount?.trr}. Pri plačilu
            se sklicujte na številko računa.
          </Text>

          <Text>
            {myAccount?.companyField}, {myAccount?.companyName}. Transakcijski
            račun odprt pri {myAccount?.bankName} – {myAccount?.trr}
            ., davčna številka: {myAccount?.taxNumber}.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            {myAccount?.companyField}, {myAccount?.companyName}. Transakcijski
            račun odprt pri {myAccount?.bankName} – {myAccount?.trr}., davčna
            številka: {myAccount?.taxNumber}.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export { index as File };
