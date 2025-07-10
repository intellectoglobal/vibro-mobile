/* eslint-disable react-hooks/rules-of-hooks */
import { Header } from "@/components/Header";
import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import { TABS } from "@/constants/forms";
import { StyleSheet, View } from "react-native";
import FormsTabs from "./forms-tabs";
// import FormSearch from "./form-search";

const forms = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    // Simulate search results
    const results = query
      ? ["Apple", "Banana", "Cherry"].filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      : [];
    setSearchResults(results);
  };
  return (
    <>
      <Header title={"Forms"} />
      <View style={styles.container}>
        <SearchBar placeholder="Filter" onSearch={handleSearch} />
        <FormsTabs />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
});

export default forms;
