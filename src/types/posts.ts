export enum PostStatus {
  NULL = 0,
  OPEN = 1,
  CLOSE = 2,
  UPCOMING = 3,
}

export type IPost = {
  id: number;
  businessName: string;
  businessUser: string;
  businessSourceImage: string;
  businessId: number;
  hashTag: string;
  time: Date;
  content: string;
  imageSource: string;
  job: string;
  status: number;
  applyId: number | undefined;
  applyTime: number | undefined;
  applyStatus: number | undefined;
};
