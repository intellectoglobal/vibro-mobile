import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactIcon from "../../../../assets/images/react-logo.png";

interface FeatureCardProps {
  title?: string;
  headline?: string;
  message?: string;
  description?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, headline, message, description }) => {
  return (
    <>
      {/* App Description */}
      <Text className="text-neutral-700 text-base font-semibold mt-5 mb-2">
        Constrogen is a smart construction app enabling effective resource planning, real-time progress tracking, and seamless collaboration across stakeholders.
      </Text>

      {/* News Section */}
      <Text className="text-neutral-700 text-base font-semibold mt-3 mb-3">Latest Update</Text>

      {/* News Item */}
      <View className="bg-white rounded-xl p-4 shadow-md">
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-full bg-avatar justify-center items-center">
            <Image className='w-10 h-10 rounded-full' source={ReactIcon} />
          </View>
          <View className="ml-3">
            <Text className="text-neutral-700 text-sm font-semibold">{title || "New Module Launched"}</Text>
            <Text className="text-neutral-400 text-xs mt-0.5">24 Jul</Text>
          </View>
        </View>

        <View className="mt-2">
          <View className="flex-row items-center mb-2">
            <Icon name="check-circle" size={16} color="#10B981" />
            <Text className="text-neutral-700 text-sm font-semibold ml-1.5">
              {headline || "Construction Schedule Module Released!"}
            </Text>
          </View>

          <Text className="text-neutral-700 text-sm mb-1">Hi Team,</Text>
          <Text className="text-neutral-500 text-sm leading-5 mb-4">
            {description || "We're excited to roll out the new Construction Scheduling feature. This module helps you assign tasks, set deadlines, and monitor milestones with ease."}
          </Text>

          <TouchableOpacity className="flex-row items-center bg-neutral-100 px-4 py-2.5 rounded-lg justify-between">
            <Icon name="play-circle-outline" size={20} color="#6B46C1" />
            <Text className="text-primary text-sm font-medium flex-1 ml-2">Watch Overview</Text>
            <Icon name="chevron-right" size={20} color="#6B46C1" />
          </TouchableOpacity>
        </View>

        <View className="bg-primary rounded-xl h-32 mt-5 justify-center items-center">
          <View className="bg-accent w-20 h-20 rounded-lg justify-center items-center">
            <Icon name="build" size={60} color="white" />
          </View>
        </View>

        <View className="flex-row items-center bg-white py-3 px-4 mt-4 rounded-lg">
          <View className="flex-row items-center mr-5">
            <Icon name="favorite-border" size={16} color="#9CA3AF" />
            <Text className="text-neutral-400 text-sm ml-1">0</Text>
          </View>
          <View className="flex-row items-center mr-5">
            <Icon name="chat-bubble-outline" size={16} color="#9CA3AF" />
            <Text className="text-neutral-400 text-sm ml-1">0</Text>
          </View>
          <Icon name="bookmark-border" size={16} color="#9CA3AF" />
        </View>
      </View>
    </>
  );
};

export default FeatureCard;
