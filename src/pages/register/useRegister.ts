import { postImage } from "@apis/common/image";
import { ApolloQueryResult } from "@apollo/client";
import { useEmployee } from "@contracts/useEmployee";
import { IUseToast } from "@iscv/toast";
import { ethers } from "ethers";
import { NavigateFunction } from "react-router-dom";
import { FormikData } from "./types";
import { useLoading } from "@components/Loading";

export const useRegister = async (
  values: FormikData,
  signer: ethers.providers.JsonRpcSigner,
  toast: IUseToast,
  navigate: NavigateFunction,
  refresh: (
    variables?:
      | Partial<{
          user: string | undefined;
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>
) => {
  const loading = useLoading();
  loading.open();
  try {
    const df = new FormData();
    df.append("image", values.avatar);
    const imageSource = await postImage(df).then(
      (success: any) => success.data
    );
    const employeeContract = useEmployee(signer);
    const tx = await employeeContract.addEmployee(
      values.fullname,
      values.phone,
      values.professional,
      values.email,
      values.github,
      values.linkedin,
      imageSource,
      { from: signer._address }
    );
    await tx.wait().then(async (success) => {
      await refresh();
      toast.success();
      navigate("/");
    });
  } catch (error) {
    console.log(error);
    toast.error();
  } finally {
    loading.close();
  }
};
