import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import CustomDropdown from "./ui/CustomDropdown";

interface LocationDropdownProps {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  locations: string[];
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  control,
  name,
  label,
  required = false,
  locations,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <CustomDropdown
              options={locations.map((loc) => ({ label: loc, value: loc }))}
              selectedValue={value}
              onValueChange={onChange}
              placeholder="Select location"
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default LocationDropdown;
