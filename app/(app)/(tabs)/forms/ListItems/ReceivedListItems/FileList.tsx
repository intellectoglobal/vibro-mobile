import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import React from "react";
import { Submission } from "@/types/sent";
import { Received } from "@/types/received";

interface FileListProps {
  items: Received;
  formId: any;
  onClick?: (formId: any, submissionId: any) => void;
}

const FileList = ({ items, formId, onClick }: FileListProps) => {
  const title = `Submission # ${items.id}`;
  const isCompleted = items.is_completed;
  const statusText = isCompleted ? `Completed` : "Pending";
  const date = isCompleted
    ? `Completed on ${new Date(items.completed_on ?? "").toLocaleString()}`
    : `Initiated on ${new Date(
        items.submission_initiated_on
      ).toLocaleString()}`;

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onClick?.(formId, items.id);
      }}
    >
      <View style={styles.left}>
        <FeatherIcon name="file-text" size={24} color="#6b7280" />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.title}>{title}</Text>
          <Text>Stage : {items.stage_name}</Text>
          <Text style={isCompleted ? styles.completed : styles.pending}>
            {statusText}
          </Text>
          <Text>{date}</Text>
        </View>
      </View>
      <SimpleLineIconsIcon name="arrow-right" size={22} color="#6b7280" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#374151", // Tailwind's text-gray-800
    fontWeight: "500",
  },
  pending: {
    marginTop: 2,
    fontSize: 14,
    color: "#D97706", // Tailwind's yellow-600
    fontWeight: "500",
  },
  completed: {
    marginTop: 2,
    fontSize: 14,
    color: "#059669", // Tailwind's green-600
    fontWeight: "500",
  },
});

export default FileList;
