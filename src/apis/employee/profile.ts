import axiosServices from "@apis/axiosServices";
import { API_ENDPOINT_NODEJS } from "@constants/index";
import { IEmployee } from "src/types";

// export const deleteAvatar = (id: number) => {
//   return axiosServices.delete(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`, {})
// }

export const getEmployeeByUser = ({ user }: { user: string }) => {
  return axiosServices.post<{ data: { employeeByUser: IEmployee } }>(
    `graphql`,
    {
      query: `query ExampleQuery($user: String) {
      employeeByUser(user: $user) {
        id
        user
        name
        phone
        professional
        email
        github
        linkedin
        sourceImage
      }
    }`,
      variables: {
        user: user,
      },
    }
  );
};
