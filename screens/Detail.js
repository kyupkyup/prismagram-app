import React from "react";
import styled from "styled-components";
import { ScrollView, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const POST_DETAIL = gql`
  query seeFullPost($id: String!){
    seeFullPost(id: $id){
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: {
      id: navigation.getParam("id")
    }
  });
  return (
    <ScrollView>
      {loading ? <Loader/> : data && data.seeFullPost && <Post {...data.seeFullPost}/>}
    </ScrollView>
  );
};
