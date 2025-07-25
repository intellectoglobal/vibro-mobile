import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
import { Control, FieldError, FieldValues } from "react-hook-form";

interface CustomSignatureProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  rules?: any;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
  isRequired?: boolean;
}

const CustomSignature: React.FC<CustomSignatureProps> = ({
  label,
  error,
  style,
  isRequired = false,
}) => {
  const [signature, setSignature] = useState<string | null>(null); // saved image
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSignature, setTempSignature] = useState<string | null>(null);
  const sigRef = useRef<any>(null);

  const handleOK = (sig: string) => {
    setTempSignature(sig);
  };

  const handleEnd = () => {
    sigRef.current?.readSignature();
  };

  const handleSave = () => {
    if (tempSignature) {
      setSignature(tempSignature);
      setModalVisible(false);
    }
  };

  const handleClear = () => {
    setTempSignature(null);
    sigRef.current?.clearSignature();
  };

  const handleReset = () => {
    setSignature(null);
    setTempSignature(null);
  };

  return (
    <View style={[styles.questionContainer, style]}>
      {label && (
        <Text style={styles.questionText}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {signature ? (
        <View style={styles.previewWrapper}>
          <Image
            source={{ uri: signature }}
            style={styles.signaturePreview}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={handleReset} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={{ color: "#007AFF" }}>Add Signature</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sign Below</Text>
          <View style={styles.signatureBox}>
            <SignatureCanvas
              ref={sigRef}
              onOK={handleOK}
              onEnd={handleEnd}
              autoClear={false}
              penColor="#000"
              backgroundColor="#fff"
              webviewProps={{
                androidLayerType: "hardware",
              }}
              descriptionText=""
              clearText=""
              confirmText=""
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClear} style={styles.button}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomSignature;

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  required: {
    color: "#FF3B30",
  },
  signaturePreview: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  previewWrapper: {
    alignItems: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginHorizontal: 8,
    marginTop: 12,
  },
  cancelButton: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
  },
  modalContainer: {
    // flex: 1,
    height: 400,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  signatureBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
});
