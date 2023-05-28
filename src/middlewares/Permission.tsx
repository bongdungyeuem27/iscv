import { useGetEmployeeByUserLazyQuery } from "@graphql/generated/schema";
import { RootState } from "@redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

type Props = {};

const Permission = (props: Props) => {
  const account = useSelector((state: RootState) => state.auth.account);

  const [
    getEmployee,
    { loading, error, data, refetch, subscribeToMore, client },
  ] = useGetEmployeeByUserLazyQuery({ variables: { user: account } });
  useEffect(() => {
    if (!account) return;
    getEmployee();
  }, [account]);
  if (data?.employeeByUser?.id === undefined) return <main></main>;
  return <Outlet></Outlet>;
};

export default Permission;
