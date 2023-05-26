import React, { useContext } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { IContext, TabContext } from "../TabContext";

type Props = {} & any;

function Tab({ tabKey, name, icon }: Props) {
  const { tab, setTab } = useContext<IContext>(TabContext);
  return (
    <div
      key={tabKey}
      className={styles.container}
      onClick={() => {
        setTab?.(tabKey);
      }}
    >
      <div className={clsx("fa-light", icon, styles.icon)}></div>
      <span className={styles.name}>{name}</span>
    </div>
  );
}

export default Tab;
