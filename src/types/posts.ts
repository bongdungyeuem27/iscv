export enum PostStatus {
  NULL = 0,
  OPEN = 1,
  CLOSE = 2,
  UPCOMING = 3,
}

export type IPost = {
  id: number;
  businessId: number;
  hashtag: any;
  time: number;
  content: string;
  imageSource: string;
  job: string;
  status: PostStatus;
  businessName: String;
  businessUser: String;
  businessSourceImage: String;
};
