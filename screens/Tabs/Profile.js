import React, { useEffect } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { ScrollView, Text } from "react-native";
import Loader from "../../Components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../Components/UserProfile";

const ME = gql`
  {
    me {
      ...userParts
    }
  }
  ${USER_FRAGMENT}
`;

// const GET_USER = gql`
//     query seeUser($userName: String!){
//         seeUser(userName: $userName){
            
//         }
//     }
// `;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;


export default () => {
    const {data, loading} = useQuery(ME);
return <ScrollView>{loading ? <Loader /> : data && data.me && <UserProfile {...data.me}/> } </ScrollView>;
};
