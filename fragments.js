import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
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
  
`;

export const USER_FRAGMENT = gql`
    fragment UserParts on User{
        id
      avatar
      userName
      fullName
      bio
      isSelf
      isFollowing
      followingCount
      followersCount
      posts {
        ...PostParts
      }
      postsCount
    }
    ${POST_FRAGMENT}
`;

