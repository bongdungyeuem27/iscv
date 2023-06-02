import axiosServices from "@apis/axiosServices";
import { IBusiness } from "src/globaltypes";
import { ISearched } from "./types";

export const getBusiness = (businessId: number) => {
  return axiosServices.get<IBusiness>(`business/profile/item/${businessId}`);
};

export const searchBusinesses = (search: string) => {
    return axiosServices.get<ISearched[]>(
      `business/profile/search?search=${search}`
    );
  };
  