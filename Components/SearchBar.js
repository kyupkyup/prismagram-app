import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextInput, View } from "react-native";
import constants from "../screens/constants";
import styles from "../styles";

const HeaderView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 10px;
`;

const TextInput1 = styled.TextInput`
  flex: 1;
  text-align: center;
  width: ${constants.width / 2};
  border-radius: 5px;
  background-color: ${props => props.theme.lightGreyColor};
`;

const SearchBar = ({ onChange, value, onSubmit }) => {
  return (
    <HeaderView>
      <TextInput1
        returnKeyType="search"
        onChangeText={onChange}
        onEndEditing={onSubmit}
        value={value}
        placeholder={"Search"}
        placeholderTextColor={styles.darkGreyColor}
      />
    </HeaderView>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
