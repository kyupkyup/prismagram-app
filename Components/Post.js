import React, { useState } from "react";
import { TouchableOpacity, Image, PlatformWindowsOSStatic } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import constants from "../screens/constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import {gql} from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import {withNavigation, navigation} from "react-navigation";
export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!){
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View``;

const Header = styled.View`
  padding: 15px;
  align-items: center;
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 700;
`;

const Text = styled.Text`
  font-size: 12;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  padding-right: 20px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text``;

const CommentCount = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 12px;
`;

const Post = ({
  author,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
  id,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables:{
      postId: id
    }
  })
  console.log(files);
  const handleLike = async () => {
    if(isLiked === true){
      setLikeCount(l => l - 1);
    }
    else{
      setLikeCount(l => l + 1);
    }
    setIsLiked(p => !p);

    try{
      await toggleLikeMutation();

    }
    catch(e){

    }
  };
  return (
    <Container>
      <Header>
        <Touchable onPress={() => navigation.navigate("UserDetail", {userName: author[0].userName})} >
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: author[0].avatar }}
          />
        </Touchable>
        <Touchable onPress={() => navigation.navigate("UserDetail", {userName: author[0].userName})}>
          <HeaderUserContainer>
            <Bold>{author[0].userName}</Bold>
            <Text>{location}</Text>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper style={{ height: constants.height / 2.5 }}>
        {files &&
          files.map(file => (
            <Image
              style={{ width: constants.width, height: constants.height / 2.5 }}
              key={file.id}
              source={{
                uri: file.url
              }}
            />
          ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable>
            <IconContainer>
              <Ionicons
                onPress={handleLike}
                size={28}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-empty"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>

          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{author[0].userName}</Bold>
          {"  "}
          {caption}
        </Caption>
        <Touchable>
          <CommentCount>see all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};
Post.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      userName: PropTypes.string.isRequired
    })
  ).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string,
  location: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired
};

export default withNavigation(Post);
