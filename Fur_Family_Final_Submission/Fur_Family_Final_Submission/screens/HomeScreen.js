import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserIcon } from "react-native-heroicons/outline";
import {
  HomeIcon,
  ScissorsIcon,
  HeartIcon,
  BuildingOfficeIcon,
  ShoppingBagIcon,
  ChatBubbleBottomCenterTextIcon,
  InformationCircleIcon,
} from "react-native-heroicons/solid";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      source={require("../assets/background-img.png")}
      className="flex-1"
    >
      <SafeAreaView>
        {/* Header */}
        <View className="flex-row justify-between p-4">
          <TouchableOpacity onPress={() => navigateToScreen("Home")}>
            <HomeIcon size={35} color="#000000" />
          </TouchableOpacity>

          {/* Middle Section (Logo) */}
          <View>
            <Image source={require("../assets/Logo.png")} className="w-60 h-60" />
          </View>

          <TouchableOpacity onPress={() => navigateToScreen("Profile")}>
            <UserIcon size={35} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Main Body */}
        <View className="flex flex-wrap flex-row mt-10">
          <TouchableOpacity
            onPress={() => navigateToScreen("Grooming")}
            className="w-1/2 px-4 mb-4"
            activeOpacity={0.6}
          >
            <View className="bg-white rounded-full p-6 shadow-xl flex-row items-center justify-center">
              <Text className="text-md font-semibold text-center">Grooming</Text>
              <ScissorsIcon size={30} color="#000000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToScreen("Clinic")}
            className="w-1/2 px-4 mb-4"
            activeOpacity={0.6}
          >
            <View className="bg-white rounded-full p-6 shadow-xl flex-row items-center justify-center">
              <Text className="text-md font-semibold text-center">Clinic</Text>
              <HeartIcon size={30} color="#000000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToScreen("Pet Hotels")}
            className="w-1/2 px-4 mb-4"
            activeOpacity={0.6}
          >
            <View className="bg-white rounded-full p-6 shadow-xl flex-row items-center justify-center">
              <Text className="text-md font-semibold text-center">
                Pet Hotels
              </Text>
              <BuildingOfficeIcon size={30} color="#000000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToScreen("Shops")}
            className="w-1/2 px-4 mb-4"
            activeOpacity={0.6}
          >
            <View className="bg-white rounded-full p-6 shadow-xl flex-row items-center justify-center">
              <Text className="text-md font-semibold text-center">Shops</Text>
              <ShoppingBagIcon size={30} color="#000000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToScreen("Discussion Forums")}
            className="w-full px-4 mb-4"
            activeOpacity={0.6}
          >
            <View className="bg-white rounded-full p-6 shadow-xl flex-row items-center justify-center">
              <Text className="text-md font-semibold text-center">
                Discussion Forums
              </Text>
              <ChatBubbleBottomCenterTextIcon size={30} color="#000000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToScreen("Pet Care Info")}
            className="w-full px-4 mb-4"
            activeOpacity={0.6}
          >
            <View className="bg-white rounded-full p-6 shadow-xl flex-row items-center justify-center">
              <Text className="text-md font-semibold text-center">
                Pet Care Info
              </Text>
              <InformationCircleIcon size={30} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
