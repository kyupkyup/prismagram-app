import { View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";

const stackFactory = initialRoute =>
  createStackNavigator({
    initialRoute
  });

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home)
  },
  Notifications: {
    screen: stackFactory(Notifications)
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
    }
  },
  Search:{
      screen: stackFactory(Search)
  },
  Profile:{
      screen: stackFactory(Profile)
  }
});
