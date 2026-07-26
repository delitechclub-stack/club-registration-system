// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0a0a0f",
    padding: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00f5ff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    fontSize: 10,
    color: "rgba(255,255,255,0.2)",
    textAlign: "center",
    marginTop: 20,
  },
  certId: {
    fontSize: 10,
    color: "#00f5ff",
    textAlign: "center",
  },
});

export default function CertificatePDF({ student }) {
  const certId = `DEL-${String(student.id || Date.now())
    .slice(0, 8)
    .toUpperCase()}`;

  return (
    <Document>
      <Page size={[600, 350]} style={styles.page}>
        <Text style={styles.title}>DELITECH IT CLUB</Text>
        <Text style={styles.subtitle}>Certificate of Registration</Text>

        <Text style={styles.name}>{student.name || "Student"}</Text>
        <Text style={styles.details}>
          {student.department || "Department"} • Semester{" "}
          {student.semester || "N/A"}
        </Text>
        <Text style={styles.message}>
          Successfully registered for DELITECH IT Club. Welcome to the
          community!
        </Text>

        <Text style={styles.footer}>
          Date: {new Date().toLocaleDateString()}
        </Text>
        <Text style={styles.certId}>ID: {certId}</Text>
      </Page>
    </Document>
  );
}
