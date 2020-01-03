import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import constants from "../constants";
import AuthButton from "../../Components/AuthButton";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex:1;
`;

const Text = styled.Text``;

const Image = styled.Image`
    width: ${constants.width / 1.5};
    height: ${constants.height / 2.5};
    margin-bottom:-50px;
`;


const ButtonContainer = styled.TouchableOpacity`
    margin-top:15px;
`;

const Button = styled.View``;
const ButtonText = styled.Text`
    color: ${props => props.theme.blueColor};
    font-weight:700;
`;



export default ({navigation}) => (
    <View>
        <Image source={require("../../assets/logo5.png")} />
        <AuthButton onPress={() => navigation.navigate("Login")} text={"Log In"} />
{/* 
        <LoginButtonContainer onPress={()=> navigation.navigate("Login")}>
            <LoginButton>
                <LoginText>Login</LoginText>
            </LoginButton>
        </LoginButtonContainer> */}
        <ButtonContainer onPress={() => navigation.navigate("SignUp")} >
            <Button>
                <ButtonText>Create New Account</ButtonText>
            </Button>
        </ButtonContainer>

    </View>
);