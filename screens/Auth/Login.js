import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({navigation}) => {
  const emailInput = useInput(navigation.getParam("email",""));
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value
    }
  });

  const handleLogin = async () => {
    Keyboard.dismiss();
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("Email not valid, EMail cannot be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("please write in email form");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("email is invalid. please write in email form.");
    }
    try {
        setLoading(true);
        const {
            data: { requestSecret }
          } = await requestSecretMutation();        
          if(requestSecret){
            Alert.alert("Check your Email.");
            navigation.navigate("Confirm", {email: value});
            return;
        }
        else{
            Alert.alert("account not found.");
            navigation.navigate("SignUp");

        }
      } 
      catch (e) {
          Alert.alert("can not login now");
      } 
      finally {
          setLoading(false);
      }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyBoardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text="Log in" onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
