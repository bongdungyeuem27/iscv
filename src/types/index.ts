export type IEmployee = {
  id: number;
  user: string;
  name: string;
  phone: string;
  professional: string;
  email: string;
  github: string;
  linkedin: string;
  sourceImage: string;
};

export type IMyDocument = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
