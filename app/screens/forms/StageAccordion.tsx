import { Stage } from "@/types/forms"; // Adjust the import path as necessary
import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import StageContent from "./StageContent";
import styles from "./styles";

interface StageAccordionProps {
  stage: Stage;
  index: number;
  isActive: boolean;
  isEnabled: boolean;
  isCompleted: boolean;
  isLastStage: boolean;
  stageLen?: number; // Optional prop for total stages
  // Function to toggle the accordion section
  onToggle: (index: number) => void;
  onCompleteStage: () => Promise<void>;
}

const StageAccordion: React.FC<StageAccordionProps> = ({
  stage,
  index,
  isActive,
  isEnabled,
  isCompleted,
  isLastStage,
  onToggle,
  onCompleteStage,
  stageLen = 3, // Default to 3 stages if not provided
}) => {
  const [animation] = useState(new Animated.Value(0));

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleToggle = () => {
    Animated.timing(animation, {
      toValue: isActive ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onToggle(index);
  };

  return (
    <View style={styles.accordionItem}>
      <View
        style={[
          styles.tabsContainer,
          isEnabled ? styles.activeTabsContainer : {},
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, isEnabled ? styles.activeTab : {}]}
          // onPress={() => toggleStage(index)}
          disabled={!isEnabled}
        >
          <Text style={[styles.tabTitle, styles.activeTabTitle]}>{`Stage ${
            index + 1
          } Of ${stageLen}`}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleToggle}>
        <View
          style={[
            styles.header,
            isActive && styles.activeHeader,
            isCompleted && styles.completedHeader,
            !isEnabled && styles.disabledHeader,
          ]}
        >
          <Text style={styles.headerText}>
            {stage.name} {isCompleted && "✓"}
          </Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Text style={styles.arrow}>▼</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isActive && (
        <StageContent
          stage={stage}
          isEnabled={isEnabled}
          isLastStage={isLastStage}
          onCompleteStage={onCompleteStage}
        />
      )}
    </View>
  );
};

export default StageAccordion;
