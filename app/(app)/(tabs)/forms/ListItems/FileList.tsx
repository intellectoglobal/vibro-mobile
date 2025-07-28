import { ItemsProps } from "@/types/forms";
import { Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import React from "react";

const FileList = (props: ItemsProps) => (
  <TouchableOpacity
    onPress={() => {
      props.onClick?.(props.items as any);
    }}
    className="flex-row items-center justify-between pt-4 pb-4 border-b border-[#D3D3D3]"
  >
    <View className="flex-row items-center">
      <FeatherIcon name="file-text" size={24} color="#6b7280" />
      <Text className="text-base text-gray-800 pl-2">{props.items.form? props.items.form.title : props.items.title}</Text>
    </View>
    <SimpleLineIconsIcon name="arrow-right" size={22} color="#6b7280" />
  </TouchableOpacity>
);

export default FileList;
