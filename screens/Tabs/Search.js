import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default class extends React.Component {
  static navigationOptions = () => ({
    headerTitle: "Hello"
  });
  render() {
    return (
      <View>
        <Text>Searchable</Text>
      </View>
    );
  }
};
