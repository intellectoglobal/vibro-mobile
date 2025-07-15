import React from "react";
import { Text, View } from "react-native";
import { Header } from "../../../components/Header"; // Adjust path if needed

const Learn = () => {
  return (
    <>
      <Header title="Learn" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-5xl text-secondary font-bold">Learn!</Text>
      </View>
    </>
  );
};

export default Learn;
