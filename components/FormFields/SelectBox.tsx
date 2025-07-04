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

type SelectBoxProps = {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <View>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={selectedLabel ? styles.selectedText : styles.placeholderText}
        >
          {selectedLabel || placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#fff",
  },
  selectedText: {
    color: "#222",
  },
  placeholderText: {
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    minWidth: 250,
    maxHeight: 300,
    paddingVertical: 8,
    elevation: 5,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    color: "#222",
  },
});

export default SelectBox;
