import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../screens/constants";

const Container = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;

const TextInput = styled.TextInput`
    background-color: ${props => props.theme.greyColor}
    width: ${constants.width / 1.8};
    padding:5px 10px;
    border: 1px solid ${props => props.theme.lightGreyColor};
    border-radius:4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyBoardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType="done",
  onSubmitEditing = () => null,
  autoCorrect = true
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      returnKeyType={returnKeyType}
      keyBoardType={keyBoardType}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyBoardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numberic",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool
};

export default AuthInput;
