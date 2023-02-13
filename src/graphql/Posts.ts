import { gql } from '@apollo/client'
import { PostStatus } from 'src/types/posts'
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
`
export type Post = {
  id: number
  businessId: number
  hashtag: any
  time: number
  content: string
  imageSource: string
  job: string
  status: PostStatus
}
export type GetPosts = {
  posts: Post[]
}

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
`

export const getPostsIdByBusinessId = gql`
  query GetPostsIdByBusinessId($businessId: Int!) {
    postsByBusinessId(businessId: $businessId) {
      id
    }
  }
`
export type GetPostsIdByBusinessId = {
  postsByBusinessId: {
    id: number
  }[]
}

export type GetPostsByBusinessId = {
  postsByBusinessId: Post[] | null
}

export type GetPost = {
  post: Post
} | null

export const getPost = gql`
  query Query($postId: Int!) {
    post(postId: $postId) {
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
`
