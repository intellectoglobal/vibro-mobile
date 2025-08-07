import React from "react";
import { StyleSheet, View } from "react-native";
import AuditFormScreen from "./AuditForm";
import { mockData } from "./mockAuditData"; // Your mock data

const AuditFormWrapper = () => {
  return (
    <View style={styles.container}>
      <AuditFormScreen route={{ params: { formData: mockData } }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuditFormWrapper;
