import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define the height of the gap between rows
const ROW_GAP = 10;

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    marginTop: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: { 
    flexDirection: 'row',
  },
  tableCell: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  gapRow: {
    height: ROW_GAP,
  },
});

const PdfDocument = ({ data }) => {
  // Check if data is undefined or empty
  if (!data || data.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>No data available to generate PDF report.</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Resource Booking Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Resource Name</Text>
              <Text style={styles.tableCell}>Mobile</Text>
              <Text style={styles.tableCell}>Booked Date</Text>
              <Text style={styles.tableCell}>Start Time</Text>
              <Text style={styles.tableCell}>End Time</Text>
            </View>
            {data.map((sportsbooking) => (
              <View style={styles.tableRow} key={sportsbooking._id}>
                <Text style={styles.tableCell}>{sportsbooking.resourceName}</Text>
                <Text style={styles.tableCell}>{sportsbooking.mobile}</Text>
                <Text style={styles.tableCell}>{new Date(sportsbooking.date).toLocaleDateString()}</Text>
                <Text style={styles.tableCell}>{sportsbooking.startTime}</Text>
                <Text style={styles.tableCell}>{sportsbooking.endTime}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
