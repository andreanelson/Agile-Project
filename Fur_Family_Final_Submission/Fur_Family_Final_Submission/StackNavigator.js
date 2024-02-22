import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Shops from "./screens/Shops";
import Clinic from './screens/Clinic';
import OnlineShops from "./screens/OnlineShops";
import TopSellingProducts from "./screens/TopSellingProducts";
import HomeScreen from "./screens/HomeScreen";
import PetCareInfo from "./screens/PetCareInfo";
import Grooming from "./screens/Grooming";
import PetHotels from "./screens/PetHotels";
import FindNearestStore from "./screens/FindNearestStore";
import DiscussionForums from "./screens/DiscussionForums";
import ForumPage from "./screens/ForumPage";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUp";
import { UserProfileProvider } from "./components/UserProfileContext";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <UserProfileProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login Screen" component={LoginScreen} />
        <Stack.Screen name="Sign up Screen" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pet Care Info" component={PetCareInfo} />
        <Stack.Screen name="Shops" component={Shops} />
        <Stack.Screen name="Clinic" component={Clinic} />
        <Stack.Screen name="Grooming" component={Grooming} />
        <Stack.Screen name="Pet Hotels" component={PetHotels} />
        <Stack.Screen name="Discussion Forums" component={DiscussionForums} />
        <Stack.Screen name="ForumPage" component={ForumPage} />
        <Stack.Screen name="Online Shops" component={OnlineShops} />
        <Stack.Screen
          name="Top Selling Products"
          component={TopSellingProducts}
        />
        <Stack.Screen name="Find Nearest Store" component={FindNearestStore} />
      </Stack.Navigator>
    </UserProfileProvider>
  );
};

export default StackNavigator;
