import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from "react-navigation-stack"

import SelectPhoto from "../screens/Photos/SelectPhoto";
import TakePhoto from "../screens/Photos/TakePhoto";
import UploadPhoto from "../screens/Photos/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTabs= createMaterialTopTabNavigator({
    Select:{
        screen: SelectPhoto,
        navigationOptions:{
            tabBarLabel : "Select"
        }
        
    },
    Take:{
        screen: TakePhoto,
        navigationOptions:{
            tabBarLabel : "Take"
        }
        
    }
},{
    tabBarPosition:"bottom",
    tabBarOptions:{
        indicatorStyle:{
            backgroundColor:styles.blackColor,
            marginBottom:20
        },
        labelStyle:{
            color: "#000000",
            fontWeight: "700"
        },
        style:{
            paddingBottom:20,
            ...stackStyles
        }
    }
});

export default createStackNavigator({
    Tabs:{
        screen:PhotoTabs,
        navigationOptions:{
            title: "choose Photo"
                }
    },
    Upload: {
        screen : UploadPhoto,
        navigationOptions:{
            title: "Upload"
        }
    }
},
    {
        defaultNavigationOptions:{
        headerStyle: {
            ...stackStyles
        }
    }}
);