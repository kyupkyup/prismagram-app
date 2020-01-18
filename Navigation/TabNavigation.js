import React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import MessagesLink from "../Components/MessagesLink";
import NavIcon from "../Components/NavIcon";
import { stackStyles } from "./config";
import Detail from "../screens/Detail"
import styles from "../styles";
import UserDetail from "../screens/UserDetail";
import styled from "styled-components";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: {
        ...customConfig,
        headerStyle: { ...stackStyles }
      }
    }
    ,Detail:{
      screen: Detail, 
      navigationOptions:{
        headerTintColor:styles.blackColor,
        title: "Photo"
      }
    },  
    UserDetail:{
    screen: UserDetail,
    navigationOptions:({navigation}) => ({
      headerTintColor:styles.blackColor,
      title: navigation.getParam("userName"),
    }),
    
  }
  },
  {
    defaultNavigationOptions:{
      headerStyle: {...stackStyles}
    }
  }
  
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerTitle: "Originals",
        headerRight: <MessagesLink />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            size={26}
          />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty"
            }
            size={26}
          />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: (
          <NavIcon
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={26}
          />
        )
      }
    },
    Search: {
      screen: stackFactory(Search),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios" ? "ios-search" : "md-search"
            }
            size={26}
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
            size={26}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        ...stackStyles
      }
    }
  }
);
