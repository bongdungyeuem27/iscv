import axiosServices from "@apis/axiosServices";

export const postImage = (df: FormData) => {
  return axiosServices.post<string>(`common/image`, df);
};
