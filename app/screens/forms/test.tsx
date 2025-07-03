import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TABS = [{ key: "tab1", title: "Step 1 of 5" }];

const ACCORDION_DATA = [
  {
    title: "Accordion 1",
    content: "Content for Accordion 1",
  },
];

const Accordion = ({ title, content, expanded, onPress }: any) => (
  <View style={styles.accordionContainer}>
    <TouchableOpacity onPress={onPress} style={styles.accordionHeader}>
      <Text style={styles.accordionTitle}>{title}</Text>
    </TouchableOpacity>
    {expanded && (
      <View style={styles.accordionContent}>
        <Text>{content}</Text>
      </View>
    )}
  </View>
);

const TabAccordionScreen = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabTitle,
                activeTab === tab.key && styles.activeTabTitle,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Accordions */}
      <ScrollView contentContainerStyle={styles.accordionList}>
        {ACCORDION_DATA.map((item, idx) => (
          <Accordion
            key={idx}
            title={item.title}
            content={item.content}
            expanded={expandedIndex === idx}
            onPress={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 6,
    borderColor: "#f57f17",
  },
  tab: {
    flex: 0.4,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: "#f57f17",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activeTab: {
    borderColor: "#007AFF",
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
  accordionList: {
    padding: 0,
    // backgroundColor: "#fff",
    marginBottom: 20,
  },
  accordionContainer: {
    marginBottom: 12,
    // borderWidth: 1,
    // borderColor: "#eee",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#ffffff",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  accordionHeader: {
    padding: 16,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  accordionContent: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});

export default TabAccordionScreen;
