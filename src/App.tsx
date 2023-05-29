import { LoadingContainer } from "@components/Loading";
import { useGetEmployeeByUserQuery } from "@graphql/generated/schema";
import { ToastContainer } from "@iscv/toast";
import { connect } from "@redux/reducers/auth";
import { setClient } from "@redux/reducers/socket";
import { RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function App() {
  const provider = useSelector((state: RootState) => state.auth.provider);
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const { loading, error, data, refetch, subscribeToMore, client } =
    useGetEmployeeByUserQuery({ variables: { user: account } });

  useEffect(() => {
    if (!provider) return;
    (provider.provider as any).on("accountsChanged", async () => {
      await dispatch<any>(connect({ provider }));
      refetch();
    });
    (provider.provider as any).on("chainChanged", async () => {
      await dispatch<any>(connect({ provider }));
      refetch();
    });
    return () => {
      (provider.provider as any).removeListener("accountsChanged", () => {});
      (provider.provider as any).removeListener("chainChanged", () => {});
    };
  }, [provider]);
  useEffect(() => {
    (async () => {
      if (!provider) return;
      await dispatch<any>(connect({ provider }));
    })();
  }, [provider]);

  useEffect(() => {
    (async () => {
      if (
        data?.employeeByUser?.id === undefined ||
        data?.employeeByUser?.id === null
      )
        return;
      await dispatch<any>(setClient({ employeeId: data?.employeeByUser?.id }));
    })();
  }, [data?.employeeByUser?.id]);
  return (
    <div className="App">
      <LoadingContainer></LoadingContainer>
      <ToastContainer></ToastContainer>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
