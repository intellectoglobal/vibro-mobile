import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox, FormTextInput } from "../../../components/FormFields";
import Accordion from "./accordion";

const TABS = [{ key: "tab1", title: "Step 1 of 5" }];

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  expanded?: boolean;
  onPress?: () => void;
};

const ACCORDION_DATA = [
  {
    title: "Accordion 1",
    content: (
      <>
        <FormTextInput label="Mani" />
        {/* <Checkbox
          label={"ddd"}
          checked={true}
          onChange={function (checked: boolean): void {
            throw new Error("Function not implemented.");
          }}
        /> */}
      </>
    ),
  },
];

type QuestionsAccordionProps = {
  tabTitle: string;
  accordionSteps?: any[];
};

const QuestionsAccordion = ({
  tabTitle,
  accordionSteps = [],
}: QuestionsAccordionProps) => {
  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <View style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabTitle, styles.activeTabTitle]}>
            {tabTitle}
          </Text>
        </View>
      </View>

      {/* Accordions */}
      <Accordion title={"Mani"}>
        <FormTextInput label="Label" />
        <Checkbox
          label={"Checkbox"}
          checked={false}
          onChange={function (checked: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 6,
    borderColor: "#f57f17",
  },
  tab: {
    flex: 0.4,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: "#f57f17",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activeTab: {
    borderColor: "#007AFF",
  },
  tabTitle: {
    color: "#fff",
    fontWeight: "500",
  },
  activeTabTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  accordionList: {
    padding: 0,
    // backgroundColor: "#fff",
    marginBottom: 20,
  },
  accordionContainer: {
    marginBottom: 12,
    // borderWidth: 1,
    // borderColor: "#eee",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#ffffff",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  accordionHeader: {
    padding: 16,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  accordionContent: {
    flex: 1,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});

export default QuestionsAccordion;
