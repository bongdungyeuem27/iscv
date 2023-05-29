import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import Item from "./Item";
import styles from "./styles.module.scss";
import { useGetEmployeeQuery } from "@graphql/generated/schema";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
function Index() {
  const id = Number(useParams().id);
  const employee = useSelector((state: RootState) => state.auth.employee);
  const location = useLocation();
  const { t } = useTranslation("page", { keyPrefix: "about.index" });

  return (
    <div className={styles.personalWrapper}>
      {employee && (
        <div className={styles.personal}>
          <div className={styles.title}>{t("personal")}</div>
          {Object.keys(employee).map((key) => {
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
                  value={Object(employee)[key]}
                ></Item>
              );
          })}
        </div>
      )}
    </div>
  );
}

export default Index;
