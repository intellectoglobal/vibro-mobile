import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, } from "react-native";
import React from "react";
import styles from "@/styles/commonStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native-gesture-handler";


const Sentmessage = () => {

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.header.backgroundColor}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" color="#fff" size={20} />
          <Text style={styles.headerTitle}>Sent Messages</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#9CA3AF"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Sent messages Screen!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Sentmessage;
