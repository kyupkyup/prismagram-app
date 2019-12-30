import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from "react-navigation-stack"

import SelectPhoto from "../screens/Photos/SelectPhoto";
import TakePhoto from "../screens/Photos/TakePhoto";
import UploadPhoto from "../screens/Photos/UploadPhoto";

const PhotoTabs= createMaterialTopTabNavigator({
    SelectPhoto,
    TakePhoto
},{
    tabBarPosition:"bottom"
});

export default createStackNavigator({
    PhotoTabs,
    UploadPhoto
});