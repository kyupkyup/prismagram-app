import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { Keyboard, Alert, TouchableWithoutFeedback } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogin } from "../../AuthContext";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex:1;
`;

const Text = styled.Text``;



export default ({navigation}) => {
    const secretKey = useInput("");
    const logIn = useLogin();
    const [loading, setLoading] = useState(false);
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables : {
            secret: secretKey.value,
            email: navigation.getParam("email")
        }
    });

    const handleConfirm = async () => {
      Keyboard.dismiss();
      const { value } = secretKey;

      if (value === "" || !value.includes(" ")) {
        return Alert.alert("please input correct secret Key");
      }

      try {
        setLoading(true);
        const {
          data: { confirmSecret }
        } = await confirmSecretMutation();
        if (confirmSecret !== "" || confirmSecret !== false) {
          logIn(confirmSecret);
        } else {
          Alert.alert("wrong secret!");
        }
      } catch (e) {
        Alert.alert("cannot confirm secret.");
      } finally {
        setLoading(false);
      }
    };

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <AuthInput
                      {...secretKey}
                      placeholder="secret Key"
                      returnKeyType="send"
                      onSubmitEditing={handleConfirm}
                      autoCorrect={false} />

            <AuthButton loading={loading} text="Confirm" onPress={handleConfirm} />
        </View>
    </TouchableWithoutFeedback>
    );

};