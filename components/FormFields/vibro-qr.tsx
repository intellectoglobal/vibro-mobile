import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

interface CustomQRScannerProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
  isRequired?: boolean;
}

const CustomQRScanner: React.FC<CustomQRScannerProps> = ({
  control,
  name,
  label,
  placeholder = "Scan QR Code",
  disabled,
  error,
  style,
  isRequired,
}) => {
  const [scannerVisible, setScannerVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = (
    result: BarcodeScanningResult,
    onChange: (value: string) => void
  ) => {
    if (result?.data) {
      onChange(result.data);
      setScannerVisible(false);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: isRequired }}
      render={({ field: { value, onChange } }) => (
        <View style={[styles.container, style]}>
          {label && (
            <Text style={styles.label}>
              {label}
              {isRequired && <Text style={styles.required}> *</Text>}
            </Text>
          )}

          <TouchableOpacity
            onPress={async () => {
              if (!disabled) {
                if (!permission?.granted) {
                  await requestPermission();
                }
                setScannerVisible(true);
              }
            }}
            style={[styles.input, disabled && styles.disabled]}
          >
            <Text style={styles.inputText}>
              {value ? `📦 ${value}` : placeholder}
            </Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error.message}</Text>}

          <Modal visible={scannerVisible} animationType="slide">
            <CameraView
              style={{ flex: 1 }}
              onBarcodeScanned={(result) => handleBarCodeScanned(result, onChange)}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setScannerVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    />
  );
};

export default CustomQRScanner;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  disabled: {
    backgroundColor: "#f0f0f0",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
  cancelButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "600",
  },
});
