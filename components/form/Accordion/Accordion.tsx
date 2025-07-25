import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isCompleted?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isCompleted,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <View style={[styles.tabsContainer, styles.activeTabsContainer]}>
        <TouchableOpacity
          style={[
            styles.tab,
            styles.activeTab,
            {
              flexDirection: "row",
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: "space-between",
            },
          ]}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={[styles.tabTitle, styles.activeTabTitle]}>{title}</Text>
          {isCompleted && (
            <MaterialIcons name="check-circle" size={24} color="#fff" />
          )}
          {/* <Text style={[styles.tabTitle, styles.activeTabTitle]}>{`Stage ${
            index + 1
          } Of ${stageLen}`}</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* <TouchableOpacity
          style={[styles.header, isCompleted && styles.completedHeader]}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.iconContainer}>
            {isCompleted && (
              <MaterialIcons name="check-circle" size={24} color="green" />
            )}
            <MaterialIcons
              name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity> */}
        {expanded && <View style={styles.content}>{children}</View>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    //borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    //borderRadius: 6,
    //padding: 10,
    margin: 0,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  completedHeader: {
    backgroundColor: "#e8f5e9",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    padding: 15,
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
    // flex: 0.4,
    flex: 1,
    paddingVertical: 10,
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
  header1: {
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
});

export default Accordion;
