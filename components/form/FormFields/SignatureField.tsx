import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
import { Question } from "../types/formTypes";

interface SignatureFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const SignatureField: React.FC<SignatureFieldProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  const signatureRef = useRef<any>(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

  const handleSignature = (signature: string) => {
    control.setValue(name, signature);
    setIsSignatureEmpty(!signature);
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
    control.setValue(name, "");
    setIsSignatureEmpty(true);
  };

  const handleConfirm = () => {
    if (isSignatureEmpty && question.is_required) {
      Alert.alert(
        "Signature Required",
        "Please provide your signature before continuing"
      );
      return;
    }
    // Signature is automatically saved via handleSignature
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>
            {question.question}
            {question.is_required && <Text style={styles.required}> *</Text>}
          </Text>

          {question.description && (
            <Text style={styles.description}>{question.description}</Text>
          )}

          <View style={styles.signatureContainer}>
            <SignatureCanvas
              ref={signatureRef}
              onOK={handleSignature}
              onEmpty={handleSignature}
              descriptionText={question.question_hint || "Sign above"}
              clearText=""
              confirmText=""
              webStyle={webStyle}
              style={styles.canvas}
              penColor="#000000"
              backgroundColor="#FFFFFF"
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <MaterialIcons name="delete" size={20} color="#FF3B30" />
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>

            {value && (
              <View style={styles.confirmContainer}>
                <MaterialIcons name="check-circle" size={20} color="#34C759" />
                <Text style={styles.confirmText}>Signed</Text>
              </View>
            )}
          </View>

          {errors[name] && (
            <Text style={styles.errorText}>{errors[name].message}</Text>
          )}
        </View>
      )}
    />
  );
};

// Styles for the web-based canvas (react-native-signature-canvas uses a webview)
const webStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: 1px dashed #ccc;
    border-radius: 4px;
  }
  .m-signature-pad--body {
    border: none;
  }
  .m-signature-pad--footer {
    display: none;
  }
`;

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
  signatureContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  canvas: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  clearButtonText: {
    marginLeft: 4,
    color: "#FF3B30",
  },
  confirmContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmText: {
    marginLeft: 4,
    color: "#34C759",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
  },
});

export default SignatureField;
