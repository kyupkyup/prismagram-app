import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import constants from "../screens/constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  margin-left: 40px;
  align-items: center;
`;

const StatNumber = styled.Text`
  font-weight: 700;
`;

const ProfileMeta = styled.View`
  margin-top: 20px;
  padding-horizontal: 20px;
`;
const Bold = styled.Text``;

const Bio = styled.Text``;

const StatName = styled.Text`
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ButtonContainer = styled.View`
  padding-vertical: 5px;
  flex-direction: row;
  margin-top: 30px;
  border: 1px solid ${styles.lightGreyColor};
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

const UserProfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  fullName,
  posts
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid(i => !i);

  return (
    <View>
      <ProfileHeader>
        <Image
          source={{ uri: avatar }}
          style={{ height: 80, width: 80, borderRadius: 40 }}
        />

        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <StatNumber>{postsCount}</StatNumber>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followersCount}</StatNumber>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followingCount}</StatNumber>
              <StatName>Followings</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.darkGreyColor : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.lightGreyColor : styles.darkGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      {posts &&
        posts.map(p =>
          isGrid ? (
            <SquarePhoto key={p.id} {...p} />
          ) : (
            <Post key={p.id} {...p} />
          )
        )}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
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
      likeCount: PropTypes.number.isRequired,
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
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired
    })
  )
};

export default UserProfile;
