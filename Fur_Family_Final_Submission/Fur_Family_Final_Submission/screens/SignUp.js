import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from 'react-native';
import * as ImagePicker from "expo-image-picker";

import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";

const PlaceholderImage = require("../assets/background-image1.png");
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useUserProfile } from "../components/UserProfileContext";

const SignUpScreen = (props) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Re_password, setRe_Password] = useState("");
  const [username, setUsername] = useState("");
  const [petname, setPetname] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [breed, setBreed] = useState("");
  const [toy, setToy] = useState("");
  const [number, setNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { updateUserProfile } = useUserProfile();
  const completeProfile = () => {
    // Assuming you have collected user profile data here
    const userProfileData = {
      email,
      password,
      Re_password,
      username,
      petname,
      selectedDate,
      breed,
      toy,
      number,
      selectedImage,

      // Add other fields here
    };

    // Update the user profile context with the collected data
    if (validateInputs() == true) {
      updateUserProfile(userProfileData);

      // Navigate to the profile page
      props.navigation.navigate("Home");
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  const validateInputs = () => {
    // Implement validation functions for each input field
    const isEmailValid = checkEmail(email);
    const isPasswordValid = confirmPasswordsMatch(password, Re_password);
    const isPhoneNumberValid = isValidPhoneNumber(number);

    // Check if a date is selected
    const isDateSelected = selectedDate !== null; // Check if the date is not empty

    if (
      isEmailValid &&
      isPasswordValid &&
      isPhoneNumberValid &&
      isDateSelected
    ) {
      return true;
      // All inputs are valid, proceed with profile completion logic
    } else {
      // Display error messages for invalid inputs
      if (!isEmailValid) {
        alert("Please enter a valid email address.");
      }
      if (!isPasswordValid) {
        alert("Please enter a valid password.");
      }
      if (!isPhoneNumberValid) {
        alert("Please enter a valid 8-digit phone number.");
      }
      if (!isDateSelected) {
        alert("Please select a valid birthday.");
      }
    }
  };
  return (
    <ImageBackground
      source={require("../assets/background-img.png")}
      className="flex-1"
    >
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
        </View>
        <InputWithLabel
          label="Email"
          placeholder="Type your email here"
          value={email}
          onChangeText={setEmail}
        />
        <InputWithLabel
          label="Username"
          placeholder="Type your username here"
          value={username}
          onChangeText={setUsername}
        />
        <InputWithLabel
          label="Password"
          placeholder="Type your password here"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <InputWithLabel
          label="Confirm password"
          placeholder="Re-type your password here"
          secureTextEntry
          value={Re_password}
          onChangeText={setRe_Password}
        />
        <InputWithLabel
          label="phone number"
          placeholder="Type your phone number here"
          value={number}
          onChangeText={setNumber}
        />
        <InputWithLabel
          label="Pet name"
          placeholder="Type your pet's name here"
          value={petname}
          onChangeText={setPetname}
        />
        <InputWithLabel
          label="Birthday"
          isDateInput={true}
          onChangeText={setSelectedDate}
        />
        <InputWithLabel
          label="Breed"
          placeholder="Type your pet's breed here"
          value={breed}
          onChangeText={setBreed}
        />
        <InputWithLabel
          label="Favorite toy"
          placeholder="Type your pet's favorite toy here"
          value={toy}
          onChangeText={setToy}
        />

        <View style={styles.footerContainer}>
          <Button
            theme="secondary"
            label="Finish Profile"
            onPress={completeProfile}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

function confirmPasswordsMatch(confirmation, original) {
  if (confirmation !== original) {
    alert("Passwords do not match, please try again.");
    return false;
  } else {
    return true;
  }
}

function checkEmail(a) {
  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(a)) {
    return false;
  } else {
    return true;
  }
}

function isValidPhoneNumber(phoneNumber) {
  // Check if the numeric phone number is exactly 8 digits
  if (phoneNumber.length != 8) {
    return false;
  } else {
    return true;
  }
}

const InputWithLabel = (props) => {
  const keyboardType = props.label === "phone number" ? "numeric" : "default"; // Set keyboardType conditionally
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    setDate(selectedDate.toDateString()); // Update the date state
    props.onChangeText(selectedDate.toDateString()); // Update the parent component's state
  };
  // Calculate the current date
  const currentDate = new Date();
  const maxDate = new Date(currentDate);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ padding: 8, fontSize: 18 }}>{props.label}</Text>
      {props.isDateInput ? (
        <View>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 16, paddingVertical: 8 }}>
              {date || "Select a date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            textColor="black"
            mode="date"
            maximumDate={maxDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      ) : (
        <TextInput
          style={{ padding: 8, fontSize: 16 }}
          placeholderTextColor="grey"
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          onSubmitEditing={props.onSubmitEditing}
          keyboardType={keyboardType}
        />
      )}
    </View>
  );
};

////// styles ///////
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#F2EFE6",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
  },

  imageContainer: {
    flex: 1,
    paddingTop: 40,

    alignContent: "center",
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 12,
  },
});
export default SignUpScreen;
