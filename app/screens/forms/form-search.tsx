import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  ...props
}) => (
  <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 bg-white">
    <MagnifyingGlassIcon size={20} color="#6b7280" />
    <TextInput
      className="flex-1 ml-2 text-base text-gray-800"
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  </View>
);

export default SearchBar;
