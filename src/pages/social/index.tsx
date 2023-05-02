import { useQuery } from "@apollo/client";
import ReviewPost from "@components/PagePost";
import { IReqPredict, IResPredict, getPredict } from "@graphql/Predict";
import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

type Props = {};

const Social = (props: Props) => {
  const id = useSelector((state: RootState) => state.auth.employee)?.id;
  const query = useQuery<IResPredict, IReqPredict>(getPredict, {
    variables: { predictionId: id! },
  });
  return (
    <div className={styles.container}>
      {query.data?.prediction.map((value) => {
        return <ReviewPost postId={value.id} key={value.id}></ReviewPost>;
      })}
    </div>
  );
};

export default Social;
