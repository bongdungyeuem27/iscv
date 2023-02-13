"use client";
import clsx from "clsx";

import styles from "./styles.module.scss";

type Props = {

};
function Notification(props: Props) {

  //   if (!show) return;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>{"notifications"}</div>
        <div className={styles.clear}>{"clear_all"}</div>
      </div>
    </div>
  );
}

export default Notification;
