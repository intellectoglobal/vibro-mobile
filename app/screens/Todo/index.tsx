import { View, Text } from "react-native";
import React from "react";
import { Header } from "@/components/Header";

const Todo = () => {
  return (
    <View>
      {/* <Header title="Vibro" /> */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-5xl text-secondary font-bold">TODO!</Text>
      </View>
    </View>
  );
};

export default Todo;
