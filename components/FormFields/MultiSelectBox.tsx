import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Option = {
  label: string;
  value: string;
};

type MultiSelectBoxProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const renderItem = ({ item }: { item: Option }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => toggleValue(item.value)}
    >
      <Text style={{ flex: 1 }}>{item.label}</Text>
      {selectedValues.includes(item.value) && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  const selectedLabels = options
    .filter((opt) => selectedValues.includes(opt.value))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <View>
      <TouchableOpacity
        style={styles.box}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: selectedLabels ? "#000" : "#888" }}>
          {selectedLabels || placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={renderItem}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
    minHeight: 44,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    maxHeight: "70%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  checkmark: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  doneButton: {
    marginTop: 12,
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MultiSelectBox;
