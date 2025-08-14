import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Switch, Text, View } from "react-native";

interface CriticalItemsSectionProps {
  hasCriticalItems: boolean;
  control: any;
}

const CriticalItemsSection: React.FC<CriticalItemsSectionProps> = ({
  hasCriticalItems,
  control,
}) => {
  if (!hasCriticalItems) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Critical Items</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Critical Items</Text>
        <Controller
          control={control}
          name="enableCriticalItems"
          render={({ field: { onChange, value } }) => (
            <Switch
              value={value || false}
              onValueChange={onChange}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="criticalItemsPassPercentage"
        rules={{
          required: "Pass percentage is required for critical items",
          min: { value: 1, message: "Must be at least 1%" },
          max: { value: 100, message: "Cannot exceed 100%" },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Text style={styles.label}>Pass Percentage for Critical Items</Text>
            {/* Replace with your numeric input component */}
            <Text>Numeric input would go here (value: {value})</Text>
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fff8f8",
    borderColor: "#ffdddd",
    borderWidth: 1,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#d32f2f",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default CriticalItemsSection;
