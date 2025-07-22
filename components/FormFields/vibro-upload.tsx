import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Video } from "expo-av";

interface CustomMediaUploadProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
  question_type: "upload_image" | "upload_video" | "upload_file";
  isRequired?: boolean;
}

const CustomMediaUpload: React.FC<CustomMediaUploadProps> = ({
  control,
  name,
  label,
  placeholder = "Upload",
  disabled,
  error,
  style,
  question_type,
  isRequired,
}) => {
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const pickMedia = async (onChange: (val: any) => void) => {
    if (disabled) return;

    try {
      if (question_type === "upload_image") {
        const res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
        if (!res.canceled && res.assets?.[0]) {
          const file = res.assets[0];
          setPreviewUri(file.uri);
          onChange(file);
        }
      } else if (question_type === "upload_video") {
        const res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        if (!res.canceled && res.assets?.[0]) {
          const file = res.assets[0];
          setPreviewUri(file.uri);
          onChange(file);
        }
      } else {
        const res = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
        if (res.assets?.[0] && res.assets[0].uri) {
          setPreviewUri(res.assets[0].uri);
          onChange(res.assets[0]);
        }
      }
    } catch (err) {
      console.warn("File picking error:", err);
    }
  };

  const renderPreview = () => {
    if (!previewUri) return null;

    if (question_type === "upload_image") {
      return <Image source={{ uri: previewUri }} style={styles.imagePreview} />;
    }

    if (question_type === "upload_video") {
      return (
        <>
          <TouchableOpacity onPress={() => setShowVideo(true)} style={styles.videoButton}>
            <Text style={styles.videoText}>▶ Play Video</Text>
          </TouchableOpacity>
          <Modal visible={showVideo} animationType="slide" onRequestClose={() => setShowVideo(false)}>
            <Video
              source={{ uri: previewUri }}
              style={{ flex: 1 }}
              useNativeControls
              shouldPlay
            />
            <TouchableOpacity onPress={() => setShowVideo(false)} style={styles.closeModalBtn}>
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </Modal>
        </>
      );
    }

    // File
    return (
      <View style={styles.fileWrapper}>
        <Text numberOfLines={1} style={styles.fileText}>
          📄 {previewUri.split("/").pop()}
        </Text>
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: isRequired }}
      render={({ field: { onChange } }) => (
        <View style={[styles.container, style]}>
          {label && (
            <Text style={styles.label}>
              {label}
              {isRequired && <Text style={styles.required}> *</Text>}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => pickMedia(onChange)}
            disabled={disabled}
            style={[styles.uploadBox, disabled && styles.disabled]}>
            <Text style={styles.uploadIcon}>
              {question_type === "upload_image"
                ? "🖼️"
                : question_type === "upload_video"
                ? "🎥"
                : "📄"}
            </Text>
            <Text style={styles.uploadText}>{placeholder}</Text>
          </TouchableOpacity>

          {renderPreview()}

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default CustomMediaUpload;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  uploadBox: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderStyle: "dashed",
    borderColor: "#999",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadText: {
    color: "#888",
    fontSize: 14,
  },
  imagePreview: {
    marginTop: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  videoButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },
  videoText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  fileWrapper: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
  },
  fileText: {
    fontSize: 14,
    color: "#333",
  },
  error: {
    marginTop: 6,
    color: "red",
    fontSize: 12,
  },
  disabled: {
    opacity: 0.6,
  },
  closeModalBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
