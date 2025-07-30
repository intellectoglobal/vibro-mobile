import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
import { Control, FieldError, FieldValues, Controller } from "react-hook-form";
import { uploadToCloudinary } from "@/services/uploadToCloudinary";
import { Question } from "../types/formTypes";

// Helper to extract public_id from a Cloudinary URL
const extractCloudinaryPublicId = (url: string) => {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const filename = lastPart.split(".")[0];
  const folderPath = parts.slice(6, parts.length - 1).join("/");
  return `${folderPath}/${filename}`;
};

// Stub for Cloudinary delete (replace with actual API call in production)
const deleteFromCloudinary = async (publicId: string, cloudName: string) => {
  console.log("🔄 Deleting signature from Cloudinary:", publicId);
  await new Promise((res) => setTimeout(res, 1000)); // Simulate delay
  console.log("✅ Signature deleted from Cloudinary");
};

interface CustomSignatureProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
  isCompleted?: boolean
}

const CustomSignature: React.FC<CustomSignatureProps> = ({
  control,
  name,
  question,
  errors,
  isCompleted
}) => {
  const [signatureUrl, setSignatureUrl] = useState<string | null>(question?.answers?.answer); // Cloudinary URL
  const [uploading, setUploading] = useState(false); // Upload progress state
  const [deleting, setDeleting] = useState(false); // Deletion progress state
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSignature, setTempSignature] = useState<string | null>(null); // Temporary base64
  const sigRef = useRef<any>(null);
  const handleOK = (sig: string) => {
    setTempSignature(sig); // Store base64 temporarily
  };

  const handleEnd = () => {
    sigRef.current?.readSignature();
  };

  const handleSave = async (onChange: (value: string) => void) => {
    if (!tempSignature) {
      Alert.alert("Error", "No signature to save.");
      return;
    }

    try {
      setUploading(true);
      // Ensure base64 is clean (remove data URI prefix)
      const cleanBase64 = tempSignature.replace(/^data:image\/png;base64,/, "");
      const file = {
        uri: tempSignature, // Keep original URI for compatibility
        base64: cleanBase64, // Add clean base64 for Cloudinary
        name: `signature_${Date.now()}.png`,
        type: "image/png",
      };

      console.log("📤 Uploading signature:", {
        name: file.name,
        type: file.type,
        uri: file.uri.substring(0, 50) + "...", // Log partial URI for brevity
      });

      // Upload to Cloudinary with retry logic
      let cloudinaryUrl: string | null = null;
      const maxRetries = 3;
      let attempt = 0;

      while (attempt < maxRetries && !cloudinaryUrl) {
        try {
          cloudinaryUrl = await uploadToCloudinary(
            file,
            "mobile_unsigned",
            "dxppo6n3w"
          );
        } catch (retryErr: any) {
          attempt++;
          console.warn(`❌ Upload attempt ${attempt} failed:`, retryErr?.message || retryErr);
          if (attempt === maxRetries) {
            throw retryErr; // Rethrow after max retries
          }
          // Wait before retrying
          await new Promise((res) => setTimeout(res, 1000));
        }
      }

      if (!cloudinaryUrl) {
        throw new Error("Failed to upload signature after retries.");
      }

      console.log("✅ Uploaded signature:", cloudinaryUrl);

      setSignatureUrl(cloudinaryUrl); // Store Cloudinary URL
      onChange(cloudinaryUrl); // Update form value
      setModalVisible(false);
      setTempSignature(null); // Clear temp signature
    } catch (err: any) {
      console.error("❌ Upload failed:", err?.message || err);
      Alert.alert(
        "Upload Failed",
        err?.message || "Could not upload signature. Please check your network and try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setTempSignature(null);
    sigRef.current?.clearSignature();
  };

  const handleReset = async (onChange: (value: string) => void) => {
    if (!signatureUrl) return;

    try {
      setDeleting(true);
      const publicId = extractCloudinaryPublicId(signatureUrl);
      await deleteFromCloudinary(publicId, "dxppo6n3w");

      setSignatureUrl(null);
      setTempSignature(null);
      onChange(""); // Clear form value
    } catch (err: any) {
      console.error("❌ Deletion failed:", err?.message || err);
      Alert.alert("Deletion Failed", err?.message || "Could not delete signature.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <View style={[styles.questionContainer]}>
      {question?.question && (
        <Text style={styles.questionText}>
          {question?.question}
          {question.is_required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value: string) =>
            !question?.is_required || (value && value.length > 0) || "Signature is required",
        }}
        render={({ field: { onChange } }) => (
          <>
            {signatureUrl ? (
              <View style={styles.previewWrapper}>
                <Image
                  source={{ uri: signatureUrl }}
                  style={styles.signaturePreview}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => handleReset(onChange)}
                  style={[styles.button, (isCompleted || uploading || deleting) && styles.disabledButton]}
                  disabled={ isCompleted || uploading || deleting}
                >
                  {deleting ? (
                    <ActivityIndicator size="small" color="#FF3B30" />
                  ) : (
                    <Text style={styles.buttonText}>Reset</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.addButton, (isCompleted || uploading || deleting) && styles.disabledButton]}
                disabled={isCompleted || uploading || deleting}
              >
                <Text style={[styles.addButtonText, (isCompleted || uploading || deleting) && styles.disabledText]}>
                  Add Signature
                </Text>
              </TouchableOpacity>
            )}

            {uploading && (
              <View style={styles.progressContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.progressText}>Uploading...</Text>
              </View>
            )}

            {errors && <Text style={styles.errorText}>{errors.message}</Text>}

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
                    <TouchableOpacity
                      onPress={() => handleSave(onChange)}
                      style={[styles.button, uploading && styles.disabledButton]}
                      disabled={uploading}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleClear}
                      style={styles.button}
                      disabled={uploading}
                    >
                      <Text style={styles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={[styles.button, styles.cancelButton]}
                      disabled={uploading}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      />
    </View>
  );
};

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
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
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
  addButtonText: {
    color: "#007AFF",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  signatureBox: {
    width: "100%",
    height: "40%",
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
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  progressText: {
    marginLeft: 8,
    color: "#007AFF",
    fontSize: 14,
  },
});

export default CustomSignature;