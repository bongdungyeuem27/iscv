export enum Professional {
  STUDENT = "student",
  FRESHER = "fresher",
  INTERN = "intern",
  ANOTHER = "another",
}

export type FormikData = {
  avatar: any;
  fullname: string;
  phone: string;
  professional: Professional;
  email: string;
  github: string;
  linkedin: string;
  category: string;
  password: string;
  confirmpassword: string;
};
