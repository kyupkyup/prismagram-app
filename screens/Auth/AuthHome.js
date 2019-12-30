import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex:1;
`;

const Text = styled.Text``;

export default ({navigation}) => (
    <View>
        <Text>AUthHome</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
            <Text>Go to login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("SignUp")}>
            <Text>Go to Sign up</Text>
        </TouchableOpacity>
    </View>
);