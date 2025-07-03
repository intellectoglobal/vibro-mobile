import { Header } from "@/components/Header";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import StepIndicator from "../../../components/StepIndicator";
import FormSearch from "./form-search";
import TabAccordionScreen from "./test";

type FormAccordionProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function FormAccordionList({ navigation }: FormAccordionProps) {
  return (
    <>
      <Header
        title={"File List"}
        showBack
        onBackPress={() => {
          navigation?.goBack();
        }}
      />
      <View className="flex-2 items-center rounded-lg bg-white m-2 shadow-lg">
        <View style={{ width: "100%", padding: 10 }}>
          <StepIndicator
            steps={[
              {
                label: "Step 1",
                key: 1,
              },
              {
                label: "Step 2",
                key: 2,
              },
              {
                label: "Step 3",
                key: 3,
              },
              {
                label: "Step 4",
                key: 4,
              },
              {
                label: "Step 5",
                key: 5,
              },
            ]}
            currentStep={3}
          />
        </View>
      </View>
      <View className="flex-2 items-center rounded-lg m-2 shadow-lg">
        <FormSearch placeholder="Filter" />
      </View>
      <View style={{ margin: 10, flex: 1 }}>
        <TabAccordionScreen />
        <TabAccordionScreen />
        <TabAccordionScreen />
      </View>
      {/* <View style={{ padding: 5, flex: 1, marginBottom: 10 }}>
        <Card title={""}>
          <View>
            <Text>ddd</Text>
          </View>
        </Card>
      </View> */}
    </>
  );
}

// const styles = StyleSheet.create({});
