import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Textbox } from "@/components/FormFields";
import { router } from "expo-router";
import { onShowTostMessage } from "@/utility";

import { Api } from "@/services/authApi";

import { Header } from "@/components/Header";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { isAxiosError, message, ...res } = (await Api.verifyEmail(
        data
      )) as any;
      if (isAxiosError) {
        onShowTostMessage({ message });
      } else {
        router.replace({
          pathname: "/(auth)/otp-verification",
          params: { ...data, ...res, message },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header isTransparent={true} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.circularContainer}>
              <Text style={styles.largeBoldText}>V</Text>
              {/* <View style={styles.circleBadgeOne} />
              <View style={styles.circleBadgeTwo} /> */}
            </View>
            <Text style={styles.headingText}>Welcome to Vibro</Text>
            <Text style={styles.headingSmallText}>Login with your email</Text>
          </View>
          <Textbox
            control={control}
            style={[styles.transparentBottomBorderText]}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
            placeholderTextColor="#999"
            name={"email"}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            label={"Email"}
            styleLabel={styles.styleLabel}
            errorLabel={styles.errorLabel}
            error={errors["email"]}
          />
          <TouchableOpacity
            style={styles.blueRoundedContainer}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? "Sending..." : "Send OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196f3",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  viewContainer: {
    alignItems: "center", // Centers children horizontally
    marginBottom: 10, // Adds 48px bottom margin
  },
  circularContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#bfdbff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
  },
  circleBadgeOne: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#bfdbff",
  },
  circleBadgeTwo: {
    position: "absolute",
    bottom: -8,
    left: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#bfdbff",
  },
  largeBoldText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4, // Adds small spacing below the text
  },
  headingSmallText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4, // Adds small spacing below the text
  },
  styleLabel: {
    fontSize: 15,
    color: "#fff",
    letterSpacing: 1,
  },
  errorLabel: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: "#fff",
    opacity: 0.6,
    textAlign: "center",
    // width: "50%",
    borderRadius: 3,
  },
  transparentBottomBorderText: {
    // backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#94a3b8",
    //color: "white",
    fontSize: 18,
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 1,
  },
  blueRoundedContainer: {
    marginTop: 10,
    backgroundColor: "#bfdbff",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "600",
  },
});
