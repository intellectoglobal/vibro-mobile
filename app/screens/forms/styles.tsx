import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  accordionItem: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  tabsContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 6,
    borderColor: "#939393",
  },
  activeTabsContainer: {
    borderColor: "#2196f3",
  },
  tab: {
    flex: 0.4,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: "#939393",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activeTab: {
    backgroundColor: "#2196f3",
  },
  tabTitle: {
    color: "#fff",
    fontWeight: "500",
  },
  activeTabTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  activeHeader: {
    backgroundColor: "#e0e0e0",
  },
  completedHeader: {
    backgroundColor: "#d4edda",
  },
  disabledHeader: {
    backgroundColor: "#f8f9fa",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    backgroundColor: "#fff",
  },
  disabledContent: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  questionContainer: {
    marginBottom: 5,
  },
  questionText: {
    fontSize: 14,
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    minHeight: 40,
    justifyContent: "center",
  },
  checkboxContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
  },
  radioContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  finalSubmitButton: {
    backgroundColor: "#28a745",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
