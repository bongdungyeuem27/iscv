import React from "react";
import styles from "./styles.module.scss";
import { ProgressBar } from "@components/ProgressBar";

type Props = {
  title: string;
  level: number;
  max: number;
};

function Item({ title, level, max }: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>
        <div className={styles.title}>{title}</div>
        <a>
          {level}/{max}
        </a>
      </div>
      <ProgressBar percent={Math.round((level / max) * 100)}></ProgressBar>
    </div>
  );
}

export default Item;
