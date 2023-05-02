import { gql } from "@apollo/client";
import { IPost, PostStatus } from "src/types/posts";
export const getPosts = gql`
  query Query {
    posts {
      id
      businessId
      hashTag
      time
      content
      imageSource
      job
      status
    }
  }
`;

export type GetPosts = {
  posts: IPost[];
};

export const getPostsByBusinessId = gql`
  query Query($businessId: Int!) {
    postsByBusinessId(businessId: $businessId) {
      id
      businessId
      hashtag
      time
      content
      imageSource
      job
      status
    }
  }
`;

export const getPostsIdByBusinessId = gql`
  query GetPostsIdByBusinessId($businessId: ID!) {
    postsByBusinessId(businessId: $businessId) {
      id
    }
  }
`;
export type GetPostsIdByBusinessId = {
  postsByBusinessId: {
    id: number;
  }[];
};

export type GetPostsByBusinessId = {
  postsByBusinessId: IPost[] | null;
};

export type IResPost = {
  post: IPost;
} | null;

export type IReqPost = {
  postId: number;
};

export const getPost = gql`
  query Prediction($postId: ID!) {
    post(id: $postId) {
      id
      businessId
      hashTag
      time
      content
      imageSource
      job
      status
      businessName
      businessUser
      businessSourceImage
    }
  }
`;
