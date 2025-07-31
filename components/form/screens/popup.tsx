import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Platform,
} from "react-native";
import { router } from "expo-router";

// In BackNavigationPrompt.tsx props
interface BackNavigationPromptProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  formId: string;
  submissionId?: string;
  formSubmissionId?: number;
  saveDraft: () => Promise<void>;
  onLeave?: () => void; // ✅ new
}

const BackNavigationPrompt: React.FC<BackNavigationPromptProps> = ({
  visible,
  setVisible,
  formId,
  submissionId,
  formSubmissionId,
  saveDraft,
}) => {
  // ✅ Attach back button handler only on Android
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const backAction = () => {
      setVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [setVisible]);

  const handleSaveToDrafts = useCallback(async () => {
    try {
      await saveDraft?.();
      setVisible(false);
      router.push({
        pathname: "/(app)/(tabs)/forms",
        params: {
          tab: "drafts",
          formId,
          submissionId: formSubmissionId || submissionId,
        },
      });
    } catch (error: any) {
      console.error("Error saving to drafts:", error.message);
    }
  }, [formId, formSubmissionId, submissionId, saveDraft, setVisible]);

  const handleLeave = useCallback(() => {
    setVisible(false);
    router.replace("/(app)/(tabs)/forms");
  }, [setVisible]);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Would you like to save this form?
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSaveToDrafts}
            >
              <Text style={styles.modalButtonText}>Save to Drafts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.leaveButton]}
              onPress={handleLeave}
            >
              <Text style={styles.modalButtonText}>Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1, // ✅ Important for proper centering
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "column",
    gap: 10,
  },
  modalButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#34C759",
  },
  leaveButton: {
    backgroundColor: "#FF3B30",
  },
  cancelButton: {
    backgroundColor: "#007AFF",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BackNavigationPrompt;
