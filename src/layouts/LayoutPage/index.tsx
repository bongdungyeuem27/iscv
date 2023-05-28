import { useQuery } from "@apollo/client";
import avatar from "@assets/avatar.png";
import cover from "@assets/cover.png";
import { IPFS_GATEWAY } from "@constants/index";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import styles from "./styles.module.scss";
import {
  useGetBusinessByUserQuery,
  useGetBusinessLazyQuery,
  useGetBusinessQuery,
} from "@graphql/generated/schema";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useEffect } from "react";

function LayoutPage() {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);
  const { t } = useTranslation("layout", { keyPrefix: "personal.index" });
  const employee = useSelector((state: RootState) => state.auth.employee);
  const [getData, { data }] = useGetBusinessLazyQuery({
    variables: {
      businessId: id,
    },
  });
  useEffect(() => {
    if (!employee?.id) return;
    getData();
  }, [employee?.id]);
  return (
    <>
      <main className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.cover}>
            <img src={cover} className={styles.image}></img>
          </div>
          <div className={styles.avatarWrapper}>
            <img
              src={`${IPFS_GATEWAY}${data?.business?.sourceImage}` ?? avatar}
            ></img>
            <div className={styles.nameGroup}>
              <div className={styles.name}>{data?.business?.name}</div>

              <Link to={`/messages/page/${id}`} className={styles.messages}>
                {t("messages")}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <NavLink
            to={{ pathname: `/page/${id}` }}
            className={clsx(styles.tab, {
              [styles.active]: location.pathname == `/page/${id}`,
            })}
          >
            {t("posts")}
          </NavLink>
          <NavLink
            to={{ pathname: `/page/${id}/about` }}
            className={({ isActive }) =>
              clsx(styles.tab, {
                [styles.active]: isActive,
              })
            }
          >
            {t("about")}
          </NavLink>
        </div>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default LayoutPage;
