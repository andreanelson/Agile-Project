import React from "react";
import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { useUserProfile } from "../components/UserProfileContext";
import { useLayoutEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { userProfile } = useUserProfile();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/background-img.png")}
      className="flex-1"
    >
      <ScrollView>
        {userProfile?.selectedImage && (
          <Image
            source={{ uri: userProfile.selectedImage }}
            className="w-72 h-72 rounded-full border-2 border-gray-500 mx-auto mt-8"
          />
        )}
        <Text className="text-2xl font-bold text-center mt-6">Email:</Text>
        <Text className="text-2xl font-light text-center mb-4">
          {userProfile?.email || "N/A"}
        </Text>
        <Text className="text-2xl font-bold text-center">Username:</Text>
        <Text className="text-2xl font-light text-center mb-4">
          {userProfile?.username || "N/A"}
        </Text>
        <Text className="text-2xl font-bold text-center">Phone Number:</Text>
        <Text className="text-2xl font-light text-center mb-4">
          {userProfile?.number || "N/A"}
        </Text>
        <Text className="text-2xl font-bold text-center">Pet name:</Text>
        <Text className="text-2xl font-light text-center mb-4">
          {userProfile?.petname || "N/A"}
        </Text>
        <Text className="text-2xl font-bold text-center">Breed:</Text>
        <Text className="text-2xl font-light text-center mb-4">
          {userProfile?.breed || "N/A"}
        </Text>
        <Text className="text-2xl font-bold text-center">Birthday:</Text>
        <Text className="text-2xl font-light text-center mb-4">
          {userProfile?.selectedDate || "N/A"}
        </Text>
        <Text className="text-2xl font-bold text-center">Favorite Toy:</Text>
        <Text className="text-2xl font-light text-center mb-4">
          {userProfile?.toy || "N/A"}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
