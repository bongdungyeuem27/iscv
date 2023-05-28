import { useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import Panel from "./Panel/index";
import ItemSkill from "./Panel/ItemSkill";
import styles from "./styles.module.scss";
import {
  useGetBusinessQuery,
  useGetSkillsByEmployeeQuery,
} from "@graphql/generated/schema";
import { EBusinessCategory } from "src/types/business";
import IIGRequestPanel from "./IIGRequestPanel";

function Index() {
  const location = useLocation();
  const id = Number(useParams().id);
  const { data } = useGetBusinessQuery({
    variables: {
      businessId: id,
    },
  });
  return (
    <div className={styles.container}>
      {data?.business?.category == EBusinessCategory.IIG && (
        <IIGRequestPanel></IIGRequestPanel>
      )}
    </div>
  );
}

export default Index;
