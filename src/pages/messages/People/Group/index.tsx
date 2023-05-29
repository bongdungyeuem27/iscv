import { useState } from "react";
import CompactItem from "../../Components/CompactItem";
import styles from "./styles.module.scss";

import { useTranslation } from "react-i18next";
import { ContentLoader } from "@components/ContentLoader";
function Index() {
  const [listAccount, setListAccount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation("page", { keyPrefix: "messages.index" });

  return (
    <div className={styles.group}>
      <div className={styles.title}>
        <div className={styles.iconGroupName}>
          <div className={styles.icon}>
            <i className="fa-sharp fa-solid fa-location-check"></i>
          </div>
          <div className={styles.name}>{t("recently_messages")}</div>
        </div>
        <div className={styles.more}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>

      <div className={styles.main}>
        {/* {isLoading ? (
          <ContentLoader></ContentLoader>
        ) : (
          <>
            {listAccount?.map((value, index) => {
              return <CompactItem key={index} {...value}></CompactItem>;
            })}
          </>
        )} */}
      </div>
    </div>
  );
}

export default Index;
