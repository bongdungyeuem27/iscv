import axiosServices from "@apis/axiosServices";

export const getMyPosts = ({ userid }: { userid: number }) => {
  return axiosServices.get<any>(`business/posts/myposts/${userid}`);
};


