import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Question } from "../types/formTypes";
import { uploadToCloudinary } from "@/services/uploadToCloudinary";

interface FileUploadQuestionProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const FileUploadField: React.FC<FileUploadQuestionProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  const handleNewFiles = async (
    assets: any[],
    type: "image" | "video",
    onChange: (files: any[]) => void
  ) => {
    Alert.alert(
      "Upload Confirmation",
      "Do you want to upload the selected file(s) to Cloudinary?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Upload",
          onPress: async () => {
            try {
              const uploaded: any[] = [];

              for (const asset of assets) {
                try {
                  const mimeType =
                    asset.mimeType ||
                    asset.type ||
                    (type === "video" ? "video/mp4" : "image/jpeg");

                  const extension =
                    mimeType.split("/")[1] ||
                    (type === "video" ? "mp4" : "jpg");

                  const file = {
                    uri: asset.uri,
                    name:
                      asset.fileName ||
                      asset.name ||
                      `${type}_${Date.now()}.${extension}`,
                    type: mimeType,
                  };

                  console.log("📤 Uploading file to Cloudinary:", file);

                  const cloudinaryUrl = await uploadToCloudinary(
                    file,
                    "mobile_unsigned", // 🔁 Replace
                    "dxppo6n3w" // 🔁 Replace
                  );

                  console.log("✅ Uploaded to Cloudinary:", cloudinaryUrl);

                  uploaded.push({
                    uri: cloudinaryUrl,
                    name: file.name,
                    type,
                    size: asset.fileSize || asset.size || 0,
                  });
                } catch (uploadErr: any) {
                  console.error("❌ Upload failed for file:", asset.uri);
                  console.error(
                    "🔍 Error message:",
                    uploadErr?.message || uploadErr
                  );
                }
              }

              if (uploaded.length === 0) {
                Alert.alert(
                  "Upload Failed",
                  "None of the files could be uploaded."
                );
                return;
              }

              const updatedFiles = [...files, ...uploaded].slice(
                0,
                question?.number_of_file_allowed || 5
              );

              setFiles(updatedFiles);
              onChange(updatedFiles);
            } catch (err: any) {
              console.error("❌ Unexpected upload error:", err?.message || err);
              Alert.alert(
                "Upload Failed",
                err?.message || "Something went wrong."
              );
            }
          },
        },
      ]
    );
  };

  const [files, setFiles] = useState<any[]>([]);

  const pickFile = async (onChange: (files: any[]) => void) => {
    try {
      if (question.question_type === "upload_image") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: question.number_of_file_allowed !== 1,
          quality: 0.8,
        });

        if (!result.canceled) {
          handleNewFiles(result.assets, "image", onChange);
        }
      } else if (question.question_type === "upload_video") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsMultipleSelection: question.number_of_file_allowed !== 1,
        });

        if (!result.canceled) {
          handleNewFiles(result.assets, "video", onChange);
        }
      } else {
        const result = (await DocumentPicker.getDocumentAsync({
          type:
            question.question_type === "upload_audio" ? ["audio/*"] : ["*/*"],
          multiple: question.number_of_file_allowed !== 1,
        })) as any;

        if (result.type === "success") {
          const fileType = result.mimeType?.startsWith("audio/")
            ? "audio"
            : "file";
          // handleNewFiles([result], fileType, onChange);
        }
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  // const handleNewFiles = (
  //   assets: any[],
  //   type: string,
  //   onChange: (files: any[]) => void
  // ) => {
  //   const newFiles = assets.map((asset) => ({
  //     uri: asset.uri,
  //     type,
  //     name: asset.name || asset.fileName || `${type}_${Date.now()}`,
  //     size: asset.size || 0,
  //   }));

  //   const updatedFiles = [...files, ...newFiles].slice(
  //     0,
  //     question.number_of_file_allowed || 5
  //   );

  //   setFiles(updatedFiles);
  //   onChange(updatedFiles);
  // };

  const removeFile = (index: number, onChange: (files: any[]) => void) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const getFileIcon = (type: string) => {
    switch (true) {
      case type.includes("image"):
        return <Feather name="image" size={20} color="#666" />;
      case type.includes("video"):
        return <Feather name="video" size={20} color="#666" />;
      case type.includes("audio"):
        return <Feather name="music" size={20} color="#666" />;
      case type.includes("pdf"):
        return <Feather name="file-text" size={20} color="#666" />;
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

      {question.description && (
        <Text style={styles.description}>{question.description}</Text>
      )}

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
                <Text style={styles.fileTypesText}>
                  {question.question_type === "upload_image"
                    ? "PNG, JPG, GIF"
                    : question.question_type === "upload_video"
                    ? "MP4, MOV"
                    : question.question_type === "upload_audio"
                    ? "MP3, WAV"
                    : "PNG, SVG, PDF, GIF or JPG"}
                </Text>
                <Text style={styles.fileSizeText}>(max. 25MB)</Text>
              </View>
            </TouchableOpacity>

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
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeFile(index, onChange)}
                    >
                      <MaterialIcons name="close" size={20} color="#ff4444" />
                    </TouchableOpacity>
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
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
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
  fileTypesText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 2,
  },
  fileSizeText: {
    fontSize: 12,
    color: "#999",
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
  },
  errorText: {
    color: "#ff4444",
    marginTop: 8,
    fontSize: 14,
  },
});

export default FileUploadField;
