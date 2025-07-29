/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react-hooks/exhaustive-deps */
import api from "@/services";
import { DIVISION, LOCATION, USERS_LIST } from "@/services/constants";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Question } from "../types/formTypes";

interface DropdownFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
  isCompleted?: boolean
}

const URLS = {
  division: DIVISION,
  user: USERS_LIST,
  location: LOCATION,
} as any;

const DropdownField: React.FC<DropdownFieldProps> = ({
  question,
  control,
  errors,
  name,
  isCompleted
}) => {
  const [options, setOption] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // console.log("options:", options);
  // console.log("userAnswer:", question.answers?.answer);

  // const answer = options.find((opt) => opt.id === Number(question.answers?.answer));

  // console.log("Matched answer:", answer);

  // const filteredOptions = question.options.filter((option) =>
  //   option.option.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, options]);

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const url = URLS[question?.question_type];
      if (url) {
        const response = await api.get(url);
        const options = response?.data.map((item: any) => {
          let option = item.name ?? `Unnamed ${question?.question_type}`;
          option =
            question?.question_type === "user"
              ? `${item.first_name ?? ""} ${item.last_name ?? ""}`.trim()
              : option;
          return {
            id: item.id,
            option,
          };
        });
        setOption(options);
      } else {
        setOption(question.options);
      }
    } catch (error: any) {
      console.log("❌ Failed to fetch dropdown options:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (question?.question_type) {
      fetchOptions();
    }
  }, [question?.question_type]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#2196f3" />
      </View>
    );
  }

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
        render={({ field: { onChange, value } }) => (
          <>
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            errors[name] && styles.dropdownButtonError,
          ]}
          disabled={isCompleted}
          onPress={() => {
            setSearchQuery(""); // Reset search when opening modal
            setModalVisible(true);
          }}
        >
          <Text style={styles.dropdownButtonText}>
            {isCompleted
              ? options.find((opt) => opt.id === Number(question?.answers?.answer))?.option || "—"
              : value
              ? filteredOptions.find((opt) => opt.id === value)?.option
              : question.question_hint || "Select an option"}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{question.question}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <MaterialIcons name="close" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>

                  {/* Search Input */}
                  <View style={styles.searchContainer}>
                    <MaterialIcons
                      name="search"
                      size={20}
                      color="#999"
                      style={styles.searchIcon}
                    />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search options..."
                      placeholderTextColor="#999"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      autoFocus={true}
                    />
                    {searchQuery.length > 0 && (
                      <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <MaterialIcons
                          name="cancel"
                          size={20}
                          color="#999"
                          style={styles.clearIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <FlatList
                    data={filteredOptions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.optionItem,
                          value === item.id && styles.selectedOptionItem,
                        ]}
                        onPress={() => {
                          onChange(item.id);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.optionText}>{item.option}</Text>
                        {value === item.id && (
                          <MaterialIcons
                            name="check"
                            size={20}
                            color="#007AFF"
                          />
                        )}
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    ListEmptyComponent={
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No options found</Text>
                      </View>
                    }
                  />
                </View>
              </View>
            </Modal>
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
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    minHeight: 50,
  },
  dropdownButtonError: {
    borderColor: "red",
    backgroundColor: "#FFF0F0",
  },
  dropdownButtonText: {
    fontSize: 12,
    color: "#333",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
    color: "#333",
  },
  optionItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOptionItem: {
    backgroundColor: "#F0F7FF",
  },
  optionText: {
    fontSize: 12,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    margin: 16,
  },
});

export default DropdownField;
