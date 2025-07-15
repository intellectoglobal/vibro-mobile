import Card from "@/components/Card";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SentForm() {
  return (
    <View style={{ flex: 1 }}>
      <Card title={"Sent"}>
        <Text>Sent</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
