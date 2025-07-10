import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import {Feather, Octicons, SimpleLineIcons} from "@expo/vector-icons"
import { FormProps } from "react-hook-form";
export interface NavigationProps {
  navigation: NativeStackNavigationProp<any>;
}

export const ALL_FORMS = "All Forms";

interface ItemType {
  id: string;
  name: string;
}
interface FormType {
  id: string;
  title: string;
}

interface ItemsProps {
  items: ItemType;
  onClick?: (id: string) => void;
}
interface FormsProps {
  items: FormType;
  onClick?: (id: string) => void;
}

export const FolderList = (props: ItemsProps) => (
  <TouchableOpacity
    className="flex-row items-center py-3 border-b border-[#D3D3D3]"
    onPress={() => {
      props.onClick?.(props.items as any);
    }}
  >
    <Octicons
      name="file-directory"
      size={24}
      color="#6b7280"
      className="mr-4"
    />
    <Text className="text-base text-gray-900">{props.items.name}</Text>
  </TouchableOpacity>
);

export const FileList = (props: FormsProps) => (
  <TouchableOpacity
    onPress={() => {
      props.onClick?.(props.items as any);
    }}
    className="flex-row items-center justify-between pt-4 pb-4 border-b border-[#D3D3D3]"
  >
    <View className="flex-row items-center">
      <Feather name="file-text" size={24} color="#6b7280" />
      <Text className="text-base text-gray-800 pl-2">{props.items.title}</Text>
    </View>
    <SimpleLineIcons name="arrow-right" size={22} color="#6b7280" />
  </TouchableOpacity>
);
