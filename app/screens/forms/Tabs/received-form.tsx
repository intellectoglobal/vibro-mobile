import Card from "@/components/Card";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "../constant";

export default function ReceivedForm({ navigation }: NavigationProps) {
  return (
    <View style={{ flex: 1 }}>
      <Card title={"Received"}>
        <Text>Received</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
