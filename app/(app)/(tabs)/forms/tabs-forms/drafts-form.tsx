import Card from "@/components/Card";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DraftsForm() {
  return (
    <View style={{ flex: 1 }}>
      <Card title={"Drafts"}>
        <Text>Drafts</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
