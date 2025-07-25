import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Question } from "../types/formTypes";

interface LocationFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const LocationField: React.FC<LocationFieldProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async (onChange: (value: any) => void) => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location permissions in your settings to use this feature",
          [{ text: "OK" }]
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      onChange({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: location.timestamp,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Error",
        "Could not get your current location. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {question.question}
        {question.is_required && <Text style={styles.required}> *</Text>}
      </Text>

      {question.description && (
        <Text style={styles.description}>{question.description}</Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => getCurrentLocation(onChange)}
              disabled={isLoading}
            >
              <MaterialIcons
                name="my-location"
                size={20}
                color={isLoading ? "#ccc" : "#007AFF"}
              />
              <Text style={styles.buttonText}>
                {isLoading ? "Getting Location..." : "Use Current Location"}
              </Text>
            </TouchableOpacity>

            {value && (
              <View style={styles.coordinatesContainer}>
                <Text style={styles.coordinatesText}>
                  Latitude: {value.latitude.toFixed(6)}
                </Text>
                <Text style={styles.coordinatesText}>
                  Longitude: {value.longitude.toFixed(6)}
                </Text>
                {value.accuracy && (
                  <Text style={styles.accuracyText}>
                    Accuracy: {Math.round(value.accuracy)} meters
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      />

      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}

      {/* Optional: Add a map preview component here */}
      {/* {value && (
        <MapView
          style={styles.mapPreview}
          initialRegion={{
            latitude: value.latitude,
            longitude: value.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: value.latitude,
              longitude: value.longitude,
            }}
          />
        </MapView>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: "#007AFF",
    fontSize: 16,
  },
  coordinatesContainer: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  coordinatesText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  accuracyText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
  mapPreview: {
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default LocationField;
