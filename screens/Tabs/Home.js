import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../Components/Loader";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Post from "../../Components/Post"

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      author {
        id
        userName
        avatar
      }
      files {
        id
        url
      }
      isLiked
      comments {
        id
        text
        user {
          id
          userName
        }
      }
      likeCount
      createdAt
    }
  }
`;
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? <Loader /> : data && data.seeFeed && data.seeFeed.map(post => <Post key={post.id} {...post} />)}
    </ScrollView>
  );
};
