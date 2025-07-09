import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  expandedDefault?: boolean;
  className?: object;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  expandedDefault,
  className = {},
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(expandedDefault ?? false);
  }, [expandedDefault]);

  return (
    <View
      className="bg-white rounded-lg"
      style={{ width: "100%", ...className }}
    >
      <TouchableOpacity
        onPress={toggleAccordion}
        activeOpacity={0.8}
        className="flex-row items-center justify-between px-4 py-3 border-b border-[#D3D3D3]"
      >
        <Text className="text-base font-semibold text-gray-800">{title}</Text>
        {expanded ? (
          <ChevronUpIcon size={24} color="#4B5563" />
        ) : (
          <ChevronDownIcon size={24} color="#4B5563" />
        )}
      </TouchableOpacity>
      {expanded && <View className="px-4 pb-4 mt-3">{children}</View>}
    </View>
  );
};

export default Accordion;
