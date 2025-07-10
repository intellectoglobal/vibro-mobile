import { ItemsProps } from "@/types/forms";
import { Text, TouchableOpacity } from "react-native";
import OcticonsIcon from "react-native-vector-icons/Octicons";

const FolderList = (props: ItemsProps) => (
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

export default FolderList;
