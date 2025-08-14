/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Question } from "../types/formTypes";
import { matchLogicCondition } from "@/services/matchLogicCondition";
import TableField from "./TableField";
import FormField from "./FormField";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDER_MARGIN = 30;
const SLIDER_WIDTH = SCREEN_WIDTH - SLIDER_MARGIN * 2;
const THUMB_SIZE = 28;
const TRACK_HEIGHT = 4;

interface LinearScaleFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
  isCompleted?: boolean;
}

const LinearScaleField: React.FC<LinearScaleFieldProps> = ({
  question,
  control,
  errors,
  name,
  isCompleted,
}) => {
  const minValue = question.min_value || 1;
  const maxValue = question.max_value || 10;

  const submittedValue = isCompleted ? Number(question.answers.answer) : null;

  const [sliderLayout, setSliderLayout] = useState({
    x: 0,
    width: SLIDER_WIDTH,
  });
  const thumbPosition = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef<View>(null);
  const isDragging = useRef(false);

  const calculateValue = (position: number) => {
    const percentage = position / sliderLayout.width;
    const value = minValue + Math.round(percentage * (maxValue - minValue));
    return Math.min(Math.max(value, minValue), maxValue);
  };

  const calculatePosition = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * sliderLayout.width;
  };

  const updateThumbPosition = (value: number) => {
    const position = calculatePosition(value);
    thumbPosition.setValue(position);
  };

  const getVisibleLogicIndexes = (selectedValues: any[]): number[] => {
    if (!question?.logics?.length) return [];

    const visibleLogicIndexes: number[] = [];

    question.logics.forEach((logic, index) => {
      const passes = selectedValues.some((selectedValue) =>
        matchLogicCondition(
          selectedValue,
          logic.logic_value,
          logic.logic_type,
          logic.comparison // optional
        )
      );
        console.log("passes ::", passes)
      if (passes) {
        console.log("passes ::", passes)
        visibleLogicIndexes.push(index);
      }
    });

    return visibleLogicIndexes;
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
        render={({ field: { onChange, value } }) => {
          const currentValue = isCompleted
            ? submittedValue || minValue
            : value || minValue;

          let visibleLogicIndexes: number[] = isCompleted
            ? getVisibleLogicIndexes(
                question?.answers?.answer
                  ? [Number(question.answers.answer)]
                  : []
              )
            : getVisibleLogicIndexes([currentValue]);

          useEffect(() => {
            updateThumbPosition(currentValue);
          }, [currentValue]);

          const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => !isCompleted,
            onMoveShouldSetPanResponder: () => !isCompleted,
            onPanResponderGrant: (evt) => {
              if (isCompleted) return;
              isDragging.current = true;
              const touchX = evt.nativeEvent.locationX;
              const newValue = calculateValue(touchX);
              thumbPosition.setValue(touchX);
              onChange(newValue);
            },
            onPanResponderMove: (evt, gestureState) => {
              if (!isDragging.current || isCompleted) return;
              const newPosition = Math.min(
                Math.max(gestureState.moveX - sliderLayout.x, 0),
                sliderLayout.width
              );
              const newValue = calculateValue(newPosition);
              thumbPosition.setValue(newPosition);
              onChange(newValue);
            },
            onPanResponderRelease: () => {
              isDragging.current = false;
            },
            onPanResponderTerminate: () => {
              isDragging.current = false;
            },
          });

          return (
            <>
              <View style={styles.sliderContainer}>
                {/* End labels */}
                {question.options?.length >= 2 && (
                  <View style={styles.labelsContainer}>
                    <Text style={styles.endLabel}>
                      {question.options[0].option}
                    </Text>
                    <Text style={styles.endLabel}>
                      {question.options[1].option}
                    </Text>
                  </View>
                )}

                {/* Slider */}
                <View
                  ref={sliderRef}
                  style={styles.sliderTrack}
                  onLayout={(event) => {
                    const { x, width } = event.nativeEvent.layout;
                    setSliderLayout({ x: x + SLIDER_MARGIN, width });
                    updateThumbPosition(currentValue);
                  }}
                  {...(!isCompleted ? panResponder.panHandlers : {})}
                >
                  <View style={styles.trackLine} />

                  <View style={styles.ticksContainer}>
                    {Array.from({ length: maxValue - minValue + 1 }).map(
                      (_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.tick,
                            {
                              left: `${(i / (maxValue - minValue)) * 100}%`,
                              backgroundColor:
                                i === currentValue - minValue
                                  ? "#007AFF"
                                  : "#999",
                            },
                          ]}
                        />
                      )
                    )}
                  </View>

                  {/* Thumb */}
                  <Animated.View
                    style={[
                      styles.thumb,
                      {
                        transform: [{ translateX: thumbPosition }],
                        shadowColor: "#007AFF",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                      },
                    ]}
                  />
                </View>

                {/* Value display */}
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{minValue}</Text>
                  <View style={styles.selectedValueContainer}>
                    <Text style={styles.selectedValueText}>{currentValue}</Text>
                  </View>
                  <Text style={styles.valueText}>{maxValue}</Text>
                </View>
              </View>
              {visibleLogicIndexes.length > 0 && (
                <View>
                  {question.logics?.map(
                    (logic, logicIndex) =>
                      visibleLogicIndexes.includes(logicIndex) &&
                      logic?.logic_questions?.map((logicQuestion) =>
                        logicQuestion.question_type === "table" ? (
                          <TableField
                            key={logicQuestion.question_uuid}
                            question={logicQuestion}
                            control={control}
                            errors={errors}
                            isCompleted={isCompleted}
                          />
                        ) : (
                          <FormField
                            key={logicQuestion.question_uuid}
                            question={logicQuestion}
                            control={control}
                            errors={errors}
                            isCompleted={isCompleted}
                          />
                        )
                      )
                  )}
                </View>
              )}
            </>
          );
        }}
      />

      {!isCompleted && errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: SLIDER_MARGIN,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  sliderContainer: {
    marginTop: 8,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  endLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  sliderTrack: {
    height: 40,
    justifyContent: "center",
  },
  trackLine: {
    height: TRACK_HEIGHT,
    backgroundColor: "#E0E0E0",
    borderRadius: TRACK_HEIGHT / 2,
    position: "absolute",
    left: 0,
    right: 0,
  },
  ticksContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 20,
    top: "50%",
    marginTop: -10,
  },
  tick: {
    position: "absolute",
    width: 2,
    height: 8,
    borderRadius: 1,
    top: 6,
    marginLeft: -1,
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    marginTop: -THUMB_SIZE / 2,
    zIndex: 2,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  valueText: {
    fontSize: 14,
    color: "#666",
  },
  selectedValueContainer: {
    minWidth: 40,
    alignItems: "center",
  },
  selectedValueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
  },
});

export default LinearScaleField;
