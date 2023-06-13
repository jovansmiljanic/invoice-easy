// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { MyAccount } from "@types";

// Create styles
const styles = StyleSheet.create({
  newInvoice: {
    borderRadius: "5px",
    backgroundColor: "white",
    width: "100%",
  },

  userDetails: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 30,
  },

  clientDetails: {
    display: "flex",
    alignItems: "flex-start",
    padding: 30,
  },

  col: {
    width: "100%",
    display: "flex",
    margin: 10,
    flexGrow: 1,
  },

  text: {
    fontSize: "10px",
  },
});

interface File {
  myAccount: MyAccount;
}

const index: FC<File> = ({ myAccount }) => {
  return (
    <Document>
      <Page size="A4" style={styles.newInvoice}>
        <View style={styles.userDetails}>
          <View style={styles.col}>
            <Text style={styles.text}>{myAccount?.companyName}</Text>
            <Text style={styles.text}>{myAccount?.companyAddress}</Text>
            <Text style={styles.text}>{myAccount?.zipCode}</Text>
            <Text style={styles.text}>{myAccount?.taxNumber}</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.text}>TRR: {myAccount.ttr}</Text>
            <Text style={styles.text}>BIC koda: {myAccount.bic}</Text>
            <Text style={styles.text}>E-pošta: {myAccount.email}</Text>
            <Text style={styles.text}>Telefon: {myAccount.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.clientDetails}>
          <View>
            <Text>Client details</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export { index as File };
