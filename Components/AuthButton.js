import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../screens/constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity`

`;
const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  width: ${constants.width / 2};
  padding: 10px 0;
  border-radius: 5px;
  margin-top: 10px;
`;
const Text = styled.Text`

color:white;
text-align:center;
font-weight:700;
`;

const AuthButton = ({text, onPress, loading=false, bgColor=null }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
        {loading ? <ActivityIndicator color={"white"}/> : <Text>{text}</Text> }

    </Container>
  </Touchable>
);

AuthButton.propTypes = {
    loading: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

export default AuthButton;
