import { Header } from "@/components/Header";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import AccordionForm from "./accordion";
import FormSearch from "./form-search";

const TABS = [
  { key: "new", label: "NEW" },
  { key: "drafts", label: "DRAFTS" },
  { key: "sent", label: "SENT" },
  { key: "received", label: "RECEIVED" },
];

const DATA = [
  { id: "1", name: "Documents" },
  { id: "2", name: "Pictures" },
  { id: "3", name: "Music" },
  { id: "4", name: "Videos" },
];

// const screenWidth = Dimensions.get("window").width;

type FormsTabsProps = {
  navigation: NativeStackNavigationProp<any>;
};

interface ItemType {
  id: string;
  name: string;
}

interface ItemsProps {
  items: ItemType;
  onClick?: (id: string) => void;
}

const Item = (props: ItemsProps) => (
  <TouchableOpacity
    className="flex-row items-center py-3 border-b border-[#D3D3D3]"
    onPress={() => {
      props.onClick?.(props.items as any);
    }}
  >
    <OcticonsIcon
      name="file-directory"
      size={24}
      color="#6b7280"
      className="mr-4"
    />
    <Text className="text-base text-gray-900">{props.items.name}</Text>
  </TouchableOpacity>
);

const FormsTabs = ({ navigation }: FormsTabsProps) => {
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  const handleFileList = (params: any) => {
    navigation.navigate("file-list", params);
  };

  return (
    <>
      <Header title={"Forms"} />
      <View className="flex-1 m-2.5">
        <View className="bg-white shadow-lg rounded-lg">
          <FormSearch />
        </View>
        <View className="flex-1">
          <View className="flex-row bg-white shadow-lg rounded-lg">
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
          <View className="flex-1 items-center rounded-lg bg-white mt-4 shadow-lg">
            <AccordionForm title={"Folders"} expandedDefault={true}>
              <FlatList
                data={DATA}
                renderItem={({ item }) => (
                  <Item items={item} onClick={handleFileList} />
                )}
              />
            </AccordionForm>
          </View>
        </View>
      </View>
    </>
  );
};

export default FormsTabs;
