import AuditFormWrapper from "@/components/audit/screen/AuditFormWrapper";
import React from "react";
import { View } from "react-native";

const Learn = () => {
  return (
    <>
      {/* <Header title="Learn" /> */}
      <View className="flex-1 justify-center items-center">
        <AuditFormWrapper />
        {/* <Text className="text-5xl text-secondary font-bold">Learn!</Text> */}
      </View>
    </>
  );
};

export default Learn;
