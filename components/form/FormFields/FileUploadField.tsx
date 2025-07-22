import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Question } from "../types/formTypes";

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
  const [files, setFiles] = useState<any[]>([]);

  const pickFile = async (onChange: (files: any[]) => void) => {
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
        const newFiles = result.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.type || "image",
          name: asset.fileName || `image_${Date.now()}.jpg`,
        }));
        const updatedFiles = [...files, ...newFiles].slice(
          0,
          question.number_of_file_allowed || 5
        );
        setFiles(updatedFiles);
        onChange(updatedFiles);
      }
    } else {
      const result = (await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: question.number_of_file_allowed !== 1,
      })) as any;

      if (result.type === "success") {
        const newFile = {
          uri: result.uri,
          type: result.mimeType || "file",
          name: result.name,
        };
        const updatedFiles = [...files, newFile].slice(
          0,
          question.number_of_file_allowed || 5
        );
        setFiles(updatedFiles);
        onChange(updatedFiles);
      }
    }
  };

  const removeFile = (index: number, onChange: (files: any[]) => void) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles);
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
            "Please upload at least one file",
        }}
        render={({ field: { onChange } }) => (
          <>
            <TouchableOpacity
              style={[styles.uploadButton, errors[name] && styles.inputError]}
              onPress={() => pickFile(onChange)}
            >
              <MaterialIcons
                name={
                  question.question_type === "upload_image"
                    ? "photo"
                    : "attach-file"
                }
                size={23}
                color="#666"
              />
              <Text style={styles.uploadButtonText}>
                {question.question_hint || "Tap to upload files"}
              </Text>
              <Text style={styles.fileLimitText}>
                Max {question.number_of_file_allowed || 5} files
              </Text>
            </TouchableOpacity>

            {files.length > 0 && (
              <View style={styles.fileList}>
                {files.map((file, index) => (
                  <View key={index} style={styles.fileItem}>
                    {file.type?.includes("image") ? (
                      <Image
                        source={{ uri: file.uri }}
                        style={styles.fileThumbnail}
                      />
                    ) : (
                      <MaterialIcons
                        name="insert-drive-file"
                        size={40}
                        color="#666"
                      />
                    )}
                    <Text style={styles.fileName} numberOfLines={1}>
                      {file.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeFile(index, onChange)}
                    >
                      <MaterialIcons name="close" size={20} color="red" />
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
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
  description: {
    fontSize: 11,
    color: "#666",
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  uploadButtonText: {
    fontSize: 11,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  fileLimitText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  inputError: {
    borderColor: "red",
    backgroundColor: "#FFF0F0",
  },
  fileList: {
    marginTop: 10,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    marginBottom: 8,
  },
  fileThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
});

export default FileUploadField;
