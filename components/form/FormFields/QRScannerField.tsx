import { MaterialIcons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Question } from "../types/formTypes";

interface QRScannerFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const QRScannerField: React.FC<QRScannerFieldProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [facing, setFacing] = useState<"front" | "back">("back");

  useEffect(() => {
    // Request camera permissions when component mounts
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, []);

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    setIsScanning(false);
    setScannedData(scanningResult.data);
    control.setValue(name, scanningResult.data);
  };

  const startScanning = () => {
    if (!permission?.granted) {
      Alert.alert(
        "Permission Required",
        "Camera permission is needed to scan QR codes",
        [
          {
            text: "OK",
            onPress: () => requestPermission(),
          },
        ]
      );
      return;
    }
    setIsScanning(true);
    setScannedData(null);
  };

  const resetScan = () => {
    setScannedData(null);
    control.setValue(name, "");
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: question.is_required ? "QR code scan is required" : false,
      }}
      render={({ field: { value } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>
            {question.question}
            {question.is_required && <Text style={styles.required}> *</Text>}
          </Text>

          {question.description && (
            <Text style={styles.description}>{question.description}</Text>
          )}

          {isScanning ? (
            <View style={styles.cameraContainer}>
              <CameraView
                style={styles.camera}
                facing={facing}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={
                  scannedData ? undefined : handleBarCodeScanned
                }
              >
                <View style={styles.cameraOverlay}>
                  <View style={styles.cameraFrame} />
                  <Text style={styles.scanText}>
                    Align QR code within the frame
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <MaterialIcons
                    name="flip-camera-ios"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </CameraView>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsScanning(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.scanContainer}>
              {scannedData ? (
                <>
                  <View style={styles.successContainer}>
                    <MaterialIcons
                      name="check-circle"
                      size={24}
                      color="#34C759"
                    />
                    <Text style={styles.successText}>
                      QR code scanned successfully
                    </Text>
                  </View>
                  <Text
                    style={styles.scannedData}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {scannedData}
                  </Text>
                  <TouchableOpacity
                    style={styles.rescanButton}
                    onPress={startScanning}
                  >
                    <Text style={styles.rescanButtonText}>Scan Again</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={startScanning}
                >
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.scanButtonText}>Scan QR Code</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {errors[name] && (
            <Text style={styles.errorText}>{errors[name].message}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  cameraContainer: {
    height: 300,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cameraFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  scanText: {
    color: "#FFF",
    marginTop: 16,
    fontSize: 16,
  },
  flipButton: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  cancelButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  scanContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  scanButtonText: {
    color: "#FFF",
    marginLeft: 8,
    fontWeight: "600",
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  successText: {
    color: "#34C759",
    marginLeft: 8,
    fontWeight: "600",
  },
  scannedData: {
    marginVertical: 8,
    color: "#666",
    textAlign: "center",
    maxWidth: "100%",
  },
  rescanButton: {
    marginTop: 8,
    padding: 8,
  },
  rescanButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
  },
});

export default QRScannerField;
