import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import Item from "./Item";
import styles from "./styles.module.scss";
import { useGetEmployeeQuery } from "@graphql/generated/schema";
function Index() {
  const id = Number(useParams().id);
  const { data } = useGetEmployeeQuery({ variables: { employeeId: id } });
  const location = useLocation();
  const { t } = useTranslation("page", { keyPrefix: "about.index" });
  console.log(data)
  return (
    <div className={styles.personalWrapper}>
      {data?.employee && (
        <div className={styles.personal}>
          <div className={styles.title}>{t("personal")}</div>
          {Object.keys(data.employee).map((key) => {
            if (
              !Number.isInteger(parseInt(key)) &&
              key != "__typename" &&
              key != "id" &&
              key != "idCardNumber" &&
              key != "sourceImage"
            )
              return (
                <Item
                  key={key}
                  label={key}
                  value={Object(data.employee)[key]}
                ></Item>
              );
          })}
        </div>
      )}
    </div>
  );
}

export default Index;
