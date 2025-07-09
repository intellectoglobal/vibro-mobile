import { Header } from "@/components/Header";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormSearch from "./form-search";
import DraftsForm from "./Tabs/drafts-form";
import NewForm from "./Tabs/new-form";
import ReceivedForm from "./Tabs/received-form";
import SentForm from "./Tabs/sent-form";

const TABS = [
  { key: "new", label: "NEW" },
  { key: "drafts", label: "DRAFTS" },
  { key: "sent", label: "SENT" },
  { key: "received", label: "RECEIVED" },
];

// const screenWidth = Dimensions.get("window").width;

type FormsTabsProps = {
  navigation: NativeStackNavigationProp<any>;
};

const FormsTabs = ({ navigation }: FormsTabsProps) => {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  return (
    <>
      <Header title={"Forms"} />
      <View className="flex-1 m-2.5">
        <View className="bg-white shadow-lg rounded-lg mb-3">
          <FormSearch placeholder="Filter" />
        </View>
        <View className="flex-row bg-white shadow-lg rounded-lg mb-3">
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                className={`text-base text-sm pt-3 pb-3  ${
                  activeTab === tab.key
                    ? "text-blue-500 font-bold"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </Text>
              {activeTab === tab.key && (
                <View className="absolute left-0 right-0 bottom-0 h-1 bg-blue-500 rounded" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {activeTab === "new" && <NewForm navigation={navigation} />}
        {activeTab === "drafts" && <DraftsForm navigation={navigation} />}
        {activeTab === "sent" && <SentForm navigation={navigation} />}
        {activeTab === "received" && <ReceivedForm navigation={navigation} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex3: {
    flex: 3,
    backgroundColor: "#99f",
    justifyContent: "flex-end",
  },
});

export default FormsTabs;
