import Card from "@/components/Card";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "../constant";

export default function DraftsForm({ navigation }: NavigationProps) {
  return (
    <View style={{ flex: 1 }}>
      <Card title={"Drafts"}>
        <Text>Drafts</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
