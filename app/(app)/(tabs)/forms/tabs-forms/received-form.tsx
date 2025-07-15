import Card from "@/components/Card";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ReceivedForm() {
  return (
    <View style={{ flex: 1 }}>
      <Card title={"Received"}>
        <Text>Received</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
