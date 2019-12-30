import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogOut, useLogin } from "../AuthContext";
import AuthNavigation from "../Navigation/AuthNavigation";
import MainNavigation from "../Navigation/MainNavigation";

export default () => {
  const isLoggedIn = "true";
  const logUserIn = useLogin();
  const logUserOut = useLogOut();

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};
