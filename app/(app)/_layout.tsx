import React, { useState, useCallback, useEffect } from "react";
import {
  Drawer
} from "expo-router/drawer";
import AuthWrapper from "../../components/AuthWrapper";
import CustomDrawer from "@/components/CustomDrawer";
import {
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSegments, router, useGlobalSearchParams } from "expo-router";

export default function AppLayout() {
  const segments = useSegments();
  const hideHeader = segments[segments.length - 1] === "multi-stage-form";

  const [showBackPrompt, setShowBackPrompt] = useState(false);

  const { formId = "", submissionId = "", formSubmissionId = "" } =
    useGlobalSearchParams();

  const saveDraft = async () => {
    console.log("Saving draft...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Draft saved.");
  };

  const handleSaveToDrafts = useCallback(async () => {
    try {
      await saveDraft();
      setShowBackPrompt(false);
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
  }, [formId, submissionId, formSubmissionId]);

  const handleLeave = useCallback(() => {
    setShowBackPrompt(false);
    router.replace("/(app)/(tabs)/forms");
  }, []);

  const handleCancel = useCallback(() => {
    setShowBackPrompt(false);
  }, []);

  return (
    <AuthWrapper>
      {Platform.OS !== "web" && (
        <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
      )}

      <Drawer
        drawerContent={(props) => {
          global.drawerNavigation = props.navigation;
          return <CustomDrawer {...props} />;
        }}
        screenOptions={{
          headerShown: true,
          title: "Vibro",
          drawerActiveTintColor: "#ffffff",
          drawerInactiveTintColor: "#64748b",
          drawerStyle: {
            backgroundColor: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#2196f3",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "#ffffff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "600",
          },
          headerLeft: ({ tintColor }) =>
            hideHeader ? (
              <TouchableOpacity
                onPress={() => setShowBackPrompt(true)}
                style={{ padding: 8, marginLeft: 10 }}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={tintColor || "#ffffff"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => global.drawerNavigation?.openDrawer()}
                style={{ padding: 8, marginLeft: 10 }}
              >
                <Ionicons
                  name="menu"
                  size={24}
                  color={tintColor || "#ffffff"}
                />
              </TouchableOpacity>
            ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.push("/screens/Notification/notification")
              }
              style={{ padding: 8, marginRight: 10 }}
            >
              <Ionicons name="notifications-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Main Tabs",
          }}
        />
      </Drawer>

      {/* ✅ Popup Modal Styled & Wired */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showBackPrompt}
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
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
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
