import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SignUp from "../screens/Auth/SignUp";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";
import AuthHome from "../screens/Auth/AuthHome";
import { stackStyles } from "./config";

const AuthNavigation = createStackNavigator({
  Login,
  Confirm,
  SignUp,
  AuthHome
}, 
{
    initialRouteName:"AuthHome",
    headerMode: "none"
}
);

  /* <TouchableOpacity onPress={logUserIn}>
<Text>log in</Text>
</TouchableOpacity> */

export default createAppContainer(AuthNavigation);
