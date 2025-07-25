import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stage } from "../types/formTypes";

interface StageIndicatorProps {
  stages: Stage[] | any;
  currentStageIndex: number;
  completedStages: number[];
  onStagePress?: (index: number) => void;
}

const StageIndicator: React.FC<StageIndicatorProps> = ({
  stages,
  currentStageIndex,
  completedStages,
  onStagePress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {stages.map((stage: any, index: number) => {
        console.log("currentStageIndex ::",currentStageIndex, "index ::", index)
        const isCompleted = completedStages.includes(index); //stage.is_completed 
        console.log("isCompleted ::",isCompleted)
        const isCurrent = index === currentStageIndex;
        console.log("isCurrent ::",isCurrent, currentStageIndex, index)
        const isDisabled = false //index > 0 && !completedStages.includes(index - 1);
        console.log("isCurrent ::",isCurrent)

        return (
          <TouchableOpacity
            key={stage.id}
            style={[
              styles.stageContainer,
              isCurrent && styles.currentStageContainer,
            ]}
            // onPress={() => !isDisabled && onStagePress?.(index)}
            // disabled={isDisabled}
            onPress={() => onStagePress?.(index)}
            disabled={isDisabled}
            activeOpacity={0.1}
          >
            <View
              style={[
                styles.stageCircle,
                isCurrent && styles.currentStageCircle,
                isCompleted && styles.completedStageCircle,
                // isDisabled && styles.disabledStageCircle,
              ]}
            >
              {isCompleted ? (
                <MaterialIcons name="check" size={16} color="white" />
              ) : (
                <Text
                  style={[
                    styles.stageNumber,
                    isCurrent && styles.currentStageNumber,
                    isDisabled && styles.disabledStageNumber,
                  ]}
                >
                  {index + 1}
                </Text>
              )}
            </View>
            <Text
              style={[
                styles.stageName,
                isCurrent && styles.currentStageName,
                isCompleted && styles.completedStageName,
                isDisabled && styles.disabledStageName,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {stage.name}
            </Text>
            {index < stages.length - 1 && (
              <View
                style={[
                  styles.connectorLine,
                  (isCompleted || isCurrent) && styles.activeConnectorLine,
                  isDisabled && styles.disabledConnectorLine,
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // paddingVertical: 16,
    paddingHorizontal: 8,
  },
  stageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
    width: 115,
  },
  stageCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    marginLeft: 15,
  },
  currentStageCircle: {
    backgroundColor: "#007AFF",
  },
  completedStageCircle: {
    backgroundColor: "#34C759",
  },
  disabledStageCircle: {
    backgroundColor: "#F5F5F5",
  },
  stageNumber: {
    color: "#757575",
    fontSize: 14,
    fontWeight: "500",
  },
  currentStageNumber: {
    color: "white",
  },
  disabledStageNumber: {
    color: "#BDBDBD",
  },
  stageName: {
    fontSize: 12,
    color: "#757575",
    textAlign: "center",
    maxWidth: "100%",
    paddingLeft: 6,
  },
  currentStageName: {
    color: "#007AFF",
    fontWeight: "500",
  },
  completedStageName: {
    color: "#34C759",
  },
  disabledStageName: {
    color: "#BDBDBD",
  },
  connectorLine: {
    position: "absolute",
    top: 14,
    right: -20,
    width: 25,
    height: 2,
    backgroundColor: "#E0E0E0",
    marginRight: 10,
  },
  activeConnectorLine: {
    backgroundColor: "#34C759",
  },
  disabledConnectorLine: {
    backgroundColor: "#F5F5F5",
  },
  currentStageContainer: {
    //flexDirection: "row",
    // backgroundColor: "rgba(0, 122, 255, 0.1)",
    // borderRadius: 20,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    // marginRight: 20,
  },
});

export default StageIndicator;
