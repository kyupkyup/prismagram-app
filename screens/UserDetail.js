import React from "react";
import styled from "styled-components";
import { ScrollView, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../Components/Loader";
import UserProfile from "../Components/UserProfile";

const GET_USER = gql`
  query seeUser($userName: String!){
    seeUser(userName: $userName){
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: {    
      userName: navigation.getParam("userName")
    }
  });
  return (
    <ScrollView>
      {loading ? <Loader/> : data && data.seeUser && <UserProfile {...data.seeUser}/>}
    </ScrollView>
  );
};
