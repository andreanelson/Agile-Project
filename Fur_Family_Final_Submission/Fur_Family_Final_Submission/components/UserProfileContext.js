// UserProfileContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context to manage user profile data
const UserProfileContext = createContext();

// Create a custom hook to access the user profile context
export const useUserProfile = () => useContext(UserProfileContext);

// UserProfileProvider component to wrap your app with
export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});

  // Function to update user profile data
  const updateUserProfile = (data) => {
    setUserProfile(data);
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
