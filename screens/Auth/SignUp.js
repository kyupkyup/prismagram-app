import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const FBContainer = styled.View`
  margin-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style : solid;
`;

export default ({navigation}) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const userNameInput = useInput("");

  const CreateAccountMutation = useMutation(CREATE_ACCOUNT, {
      variables: {
          userName :userNameInput.value,
          firstName:firstNameInput.value,
          lastName:lastNameInput.value,
          email:emailInput.value
      }
  })
  const [loading, setLoading] = useState(false);


  const handleSignUp = async () => {
    Keyboard.dismiss();
    const { value: eInput } = emailInput;
    const { value: fInput } = firstNameInput;
    const { value: lInput } = lastNameInput;
    const { value: uInput } = userNameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(eInput)) {
      return Alert.alert("email is invalid. please write in email form.");
    }
    if (fInput === "" || lInput === "" || uInput === "") {
      return Alert.alert("empty something");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await CreateAccountMutation();
      if (createAccount) {
        Alert.alert("Account Created", "Log in now");
        navigation.navigate("Login", { email: eInput });
      }
    } catch (e) {
      Alert.alert("UserName is already taken.");
      navigation.navigate("Login", { email: eInput });
      return;
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async () =>{
    setLoading(true);
    try {
      await Facebook.initializeAsync("2885389118174069","kyupkyup");
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email']
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response  = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id, last_name, first_name, email`);

        const {email, first_name, last_name} = await response.json();

        console.log({email, first_name, last_name});
        emailInput.setValue(email);
        firstNameInput.setValue(first_name);
        lastNameInput.setValue(last_name);
        const [userName] = email.split("@");
        userNameInput.setValue(userName);
        setLoading(false);
      } else {
        // type === 'cancel'
      }

    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    finally{
      setLoading(false);
    }
  };

  const googleLogin = async () =>{
    const GOOGLE_ID = "772173815126-254eudfd8c3th2rkd8frgusckmjonfrp.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ID,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });        
        const {email, family_name, given_name} = await user.json();
        emailInput.setValue(email);
        firstNameInput.setValue(given_name);
        lastNameInput.setValue(family_name);
        const [userName] = email.split("@");
        userNameInput.setValue(userName);

        return result.accessToken;
      } else {
        return { cancelled: true };
        
      }
      setLoading(false);
    } catch (e) {
      return { error: true };
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput {...emailInput} placeholder="Email" autoCorrect={false} />
        <AuthInput
          {...firstNameInput}
          placeholder="First Name"
          autoCorrect={false}
          autoCapitalize="words"
        />
        <AuthInput
          {...lastNameInput}
          placeholder="Last Name"
          autoCorrect={true}
          autoCapitalize="words"
        />
        <AuthInput
          {...userNameInput}
          placeholder="User Name"
          onSubmitEditing={handleSignUp}
          autoCorrect={true}
        />

        <AuthButton loading={loading} text="Sign Up" onPress={handleSignUp} />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect with Facebook"
          />
          <AuthButton
            bgColor={"#EE1922"}
            loading={false}
            onPress={googleLogin}
            text="Connect with Google"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
