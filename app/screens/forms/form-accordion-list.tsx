import { Header } from "@/components/Header";
import Test from "@/components/Test";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { View } from "react-native";
import StepIndicator from "../../../components/StepIndicator";
import FormSearch from "./form-search";
import { mockData } from "./mockData";

type FormAccordionProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function FormAccordionList({ navigation }: FormAccordionProps) {
  const steps = useMemo(() => {
    return mockData?.stages?.map(({ name: label, order: key }) => {
      return {
        label,
        key,
      };
    });
  }, []);

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
          <StepIndicator steps={steps} currentStep={0} />
        </View>
      </View>
      <View className="flex-2 items-center rounded-lg m-2 shadow-lg">
        <FormSearch placeholder="Filter" />
      </View>
      <Test />
      <View style={{ margin: 0, flex: 1 }}>
        {/* <FlatList
          data={mockData?.stages}
          keyExtractor={(item) => item?.name}
          renderItem={({ item }) => (
            <QuestionsAccordion
              tabTitle={`${item?.name} of ${mockData?.stages?.length}`}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        /> */}

        {/* {mockData?.stages?.map((item) => (
          <QuestionsAccordion key={item?.name} tabTitle={item?.name} />
        ))} */}
        {/* {mockData?.stages?.map((item) => (
          <QuestionsAccordion key={item?.name} tabTitle={item?.name} />
        ))} */}
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
