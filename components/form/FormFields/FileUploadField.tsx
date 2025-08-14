import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import * as Linking from "expo-linking";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Question } from "../types/formTypes";
import { uploadToCloudinary } from "@/services/uploadToCloudinary";

// Helper to extract public_id from a Cloudinary URL
const extractCloudinaryPublicId = (url: string) => {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const filename = lastPart.split(".")[0];
  const folderPath = parts.slice(6, parts.length - 1).join("/");
  return `${folderPath}/${filename}`;
};

// Stub for Cloudinary delete (you should ideally call your backend API)
const deleteFromCloudinary = async (publicId: string, cloudName: string) => {
  console.log("🔄 Simulating deletion for:", publicId);
  await new Promise((res) => setTimeout(res, 1000)); // simulate delay
  console.log("✅ Simulated delete complete");
};

interface FileUploadQuestionProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
  isCompleted?: boolean
}

const FileUploadField: React.FC<FileUploadQuestionProps> = ({
  question,
  control,
  errors,
  name,
  isCompleted
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null); // Track which file is being deleted
  const answerString = question?.answers?.answer || "";
  const mediaUrls = answerString.split("|").filter(Boolean);

  console.log("📸 Media URLs:", mediaUrls);


  const handleNewFiles = async (
    assets: any[],
    type: "image" | "video",
    onChange: (value: string) => void
  ) => {
    Alert.alert("Upload Confirmation", "Upload selected file(s) to Cloudinary?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Upload",
        onPress: async () => {
          try {
            setUploading(true);
            const uploaded: any[] = [];

            for (const asset of assets) {
              try {
                const mimeType =
                  asset.mimeType ||
                  asset.type ||
                  (type === "video" ? "video/mp4" : "image/jpeg");
                const extension = mimeType.split("/")[1] || "jpg";

                const file = {
                  uri: asset.uri,
                  name: asset.name || `${type}_${Date.now()}.${extension}`,
                  type: mimeType,
                };

                console.log("📤 Uploading file:", file);

                const cloudinaryUrl = await uploadToCloudinary(
                  file,
                  "mobile_unsigned",
                  "dxppo6n3w"
                );

                uploaded.push({
                  uri: cloudinaryUrl,
                  name: file.name,
                  type,
                  size: asset.fileSize || asset.size || 0,
                });

                console.log("✅ Uploaded:", cloudinaryUrl);
              } catch (uploadErr: any) {
                console.error("❌ Upload failed:", uploadErr?.message || uploadErr);
              }
            }

            if (uploaded.length === 0) {
              Alert.alert("Upload Failed", "None of the files could be uploaded.");
              return;
            }

            const updatedFiles = [...files, ...uploaded].slice(
              0,
              question?.number_of_file_allowed || 5
            );

            setFiles(updatedFiles);
            const joinedUrls = updatedFiles.map((f) => f.uri).join("|");
            onChange(joinedUrls);
          } catch (err: any) {
            console.error("❌ Unexpected error:", err?.message || err);
            Alert.alert("Upload Failed", err?.message || "Something went wrong.");
          } finally {
            setUploading(false);
          }
        },
      },
    ]);
  };

  const pickFile = async (onChange: (value: string) => void) => {
    try {
      const allowsMultiple = question.number_of_file_allowed !== 1;

      if (question.question_type === "upload_image") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Camera roll permission required!");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: allowsMultiple,
          quality: 0.8,
        });

        if (!result.canceled) {
          handleNewFiles(result.assets, "image", onChange);
        }
      } else if (question.question_type === "upload_video") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Camera roll permission required!");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsMultipleSelection: allowsMultiple,
        });

        if (!result.canceled) {
          handleNewFiles(result.assets, "video", onChange);
        }
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          type: question.question_type === "upload_audio" ? ["audio/*"] : ["*/*"],
          multiple: allowsMultiple,
        });

        console.log("Cloudinary response  ::", result);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const removeFile = async (index: number, onChange: (value: string) => void) => {
    const fileToRemove = files[index];
    const publicId = extractCloudinaryPublicId(fileToRemove.uri);

    try {
      setDeletingIndex(index); // Set the index of the file being deleted
      await deleteFromCloudinary(publicId, "dxppo6n3w");

      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      const joinedUrls = updatedFiles.map((f) => f.uri).join("|");
      onChange(joinedUrls);
    } catch (error: any) {
      console.error("Error deleting file:", error?.message || error);
      Alert.alert("Delete Failed", error?.message || "Could not delete file.");
    } finally {
      setDeletingIndex(null); // Reset deleting state
    }
  };

  const getFileIcon = (type: string) => {
    switch (true) {
      case type.includes("image"):
        return <Feather name="image" size={20} color="#666" />;
      case type.includes("video"):
        return <Feather name="video" size={20} color="#666" />;
      case type.includes("audio"):
        return <Feather name="music" size={20} color="#666" />;
      default:
        return <Feather name="file" size={20} color="#666" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {question.question}
        {question.is_required && <Text style={styles.required}> *</Text>}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) =>
            !question.is_required ||
            (value && value.length > 0) ||
            "This field is required",
        }}
        render={({ field: { onChange } }) => (
          <>
            {!isCompleted ? (
              <TouchableOpacity
                style={[
                  styles.uploadArea,
                  errors[name] && styles.uploadAreaError,
                  files.length > 0 && styles.uploadAreaWithFiles,
                ]}
                onPress={() => pickFile(onChange)}
                activeOpacity={0.7}
              >
                <View style={styles.uploadContent}>
                  <MaterialIcons
                    name="cloud-upload"
                    size={32}
                    color={errors[name] ? "#ff4444" : "#666"}
                  />
                  <Text style={styles.uploadText}>
                    {question.question_hint || "Click to upload or drag and drop"}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                {mediaUrls.length > 0 && (
                  <View style={styles.fileList}>
                    {mediaUrls.map((url, index) => {
                      const extension = url.split('.').pop()?.toLowerCase() || '';
                      const type = extension.match(/(jpg|jpeg|png|gif)/)
                        ? 'image'
                        : extension.match(/(mp4|mov)/)
                          ? 'video'
                          : extension.match(/(mp3|wav)/)
                            ? 'audio'
                            : 'file';

                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.fileItem}
                          onPress={() => {
                            // 📥 This will open the file or download it using browser
                            Linking.openURL(url);
                          }}
                        >
                          <View style={styles.fileIconContainer}>
                            {type === "image" ? (
                              <Image source={{ uri: url }} style={styles.fileThumbnail} />
                            ) : (
                              getFileIcon(type)
                            )}
                          </View>
                          <View style={styles.fileInfo}>
                            <Text style={styles.fileName} numberOfLines={1}>
                              File {index + 1}
                            </Text>
                            <Text style={styles.fileSize}>Tap to download</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            )}


            {uploading && (
              <View style={styles.progressContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.progressText}>Uploading...</Text>
              </View>
            )}

            {files.length > 0 && (
              <View style={styles.fileList}>
                {files.map((file, index) => (
                  <View key={index} style={styles.fileItem}>
                    <View style={styles.fileIconContainer}>
                      {file.type.includes("image") ? (
                        <Image
                          source={{ uri: file.uri }}
                          style={styles.fileThumbnail}
                        />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </View>
                    <View style={styles.fileInfo}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {file.name}
                      </Text>
                      <Text style={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </Text>
                    </View>
                    {deletingIndex === index ? (
                      <View style={styles.removeButton}>
                        <ActivityIndicator size="small" color="#ff4444" />
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFile(index, onChange)}
                      >
                        <MaterialIcons name="close" size={20} color="#ff4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      />

      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "#ff4444",
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 24,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadAreaError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff0f0",
  },
  uploadAreaWithFiles: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  uploadContent: {
    alignItems: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
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
  fileList: {
    borderWidth: 1,
    borderColor: "#eee",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  fileThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: "#999",
  },
  removeButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff4444",
    marginTop: 8,
    fontSize: 14,
  },
});

export default FileUploadField;