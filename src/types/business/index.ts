export type IBusiness = {
  id: number;
  user: string;
  name: string;
  phone: string;
  professional: string;
  email: string;
  github: string;
  linkedin: string;
  sourceImage: string;
  category: EBusinessCategory;
};

export enum EBusinessCategory {
  NULL,
  IIG,
}
