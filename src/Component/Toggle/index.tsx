"use client";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";

type Props = {
  positiveColor?: string;
  negativeColor?: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

export function Toggle(props: Props) {
  const { positiveColor, negativeColor, checked, setChecked } = props;
  return (
    <label onClick={() => setChecked(!checked)} className={styles.switcher}>
      <span
        style={{ background: checked ? positiveColor : negativeColor }}
        className={clsx(styles.slider, { [styles.checked]: checked })}
      ></span>
    </label>
  );
}
