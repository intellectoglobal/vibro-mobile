import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

export interface NavigationProps {
  navigation: NativeStackNavigationProp<any>;
}

export const ALL_FORMS = "All Forms";

interface ItemType {
  id: string;
  name: string;
}

interface ItemsProps {
  items: ItemType;
  onClick?: (id: string) => void;
}

export const FolderList = (props: ItemsProps) => (
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

export const FileList = (props: ItemsProps) => (
  <TouchableOpacity
    onPress={() => {
      props.onClick?.(props.items as any);
    }}
    className="flex-row items-center justify-between pt-4 pb-4 border-b border-[#D3D3D3]"
  >
    <View className="flex-row items-center">
      <FeatherIcon name="file-text" size={24} color="#6b7280" />
      <Text className="text-base text-gray-800 pl-2">{props.items.name}</Text>
    </View>
    <SimpleLineIconsIcon name="arrow-right" size={22} color="#6b7280" />
  </TouchableOpacity>
);
