import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

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
    const { value : eInput } = emailInput;
    const { value : fInput } = firstNameInput;
    const { value : lInput} = lastNameInput;
    const { value : uInput} = userNameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(eInput)) {
      return Alert.alert("email is invalid. please write in email form.");
    }
    if(fInput === "" || lInput ==="" || uInput===""){
        return Alert.alert("empty something");
    }
    try {
        setLoading(true);
        const {
            data: { createAccount }
          } = await CreateAccountMutation();        
          if(createAccount){
            Alert.alert("Account Created", "Log in now");
            navigation.navigate("Login", {email: eInput});
        }

      } 
      catch (e) {
        Alert.alert("UserName is already taken.");
        navigation.navigate("Login", {email: eInput});
        return;
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
          autoCorrect={false}
        />
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
      </View>
    </TouchableWithoutFeedback>
  );
};
