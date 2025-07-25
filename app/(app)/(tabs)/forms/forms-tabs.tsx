import Tabs from "@/components/Tabs";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DraftsForm from "./tabs-forms/drafts-form";
import NewForm from "./tabs-forms/new-form";
import ReceivedForm from "./tabs-forms/received-form";
import SentForm from "./tabs-forms/sent-form";

// const TABS = [
//   { key: "new", label: "NEW" },
//   { key: "drafts", label: "DRAFTS" },
//   { key: "sent", label: "SENT" },
//   { key: "received", label: "RECEIVED" },
// ];

const FormsTabs = () => {
  const [activeTab, setActiveTab] = useState("new");

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <View style={styles.container}>
      {/* <Tabs
        // tabs={TABS}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        activeTextColor="#FF5733"
        inactiveTextColor="#000"
        indicatorColor="#FF5733"
        containerStyle={styles.tabsContainer}
        textStyle={styles.tabText}
      /> */}

      {/* <View style={styles.contentContainer}>
        {activeTab === "new" && <NewForm />}
        {activeTab === "drafts" && <DraftsForm />}
        {activeTab === "sent" && <SentForm />}
        {activeTab === "received" && <ReceivedForm />}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  tabsContainer: {
    padding: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    backgroundColor: "#f9f9f9",
  },
  contentText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default FormsTabs;
