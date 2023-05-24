import { useQuery } from "@apollo/client";
import ReviewPost from "@components/PagePost";

import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { Exact, useGetPredictQuery } from "@graphql/generated/schema";

type Props = {};

const Social = (props: Props) => {
  const id = useSelector((state: RootState) => state.auth.employee)?.id;
  const query = useGetPredictQuery({variables: { employeeId: id!  }})
  return (
    <div className={styles.container}>
      {query.data?.prediction?.map((value) => {
        return <ReviewPost postId={value?._id!} key={value?._id}></ReviewPost>;
      })}
    </div>
  );
};

export default Social;
