import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useState, useLayoutEffect } from "react";

import { useNavigation } from "@react-navigation/native";

// Screen One
const LoginScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/background-img.png")}
      className="flex-1"
    >
      <SafeAreaView className="items-center">
        <Image source={require("../assets/Logo.png")} className="w-60 h-60" />
        <Login
          label="Username" // Added label prop
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Login
          label="Password" // Added label prop
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text className="text-blue-500 mt-[-10]">Forgot password?</Text>

        <TouchableOpacity onPress={() => navigateToScreen("Home")}>
          <Text className="text-blue-500 pt-5">Continue as guest</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen("Sign up Screen")}>
          <Text className="text-blue-500 pt-5">Sign up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

// Updated Login component to use Tailwind CSS classes
const Login = (props) => {
  return (
    <View className="p-4 items-center">
      <Text className="p-2 text-lg">{props.label}</Text>
      <TextInput
        className="py-2 px-[40%] border-gray-500 rounded-lg shadow-xl"
        placeholderTextColor="gray"
        backgroundColor="white"
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};

export default LoginScreen;
