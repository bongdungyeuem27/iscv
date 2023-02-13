"use client";

import { useContext } from "react";
import { InfoPanelContext } from "./InfoPanelContext";
import styles from "./styles.module.scss";

type Props = {};

const ButtonNotification = (props: Props) => {
  const { panelRef, showInfoPanel, setShowInfoPanel } =
    useContext(InfoPanelContext);

  return (
    <button
      onClick={() => {
        setShowInfoPanel!((e) => {
          return {
            show: e.show == false ? true : e.panel != 2 ? true : false,
            panel: 2,
          };
        });
      }}
      id="header_button"
      key={5}
      className={styles.buttonItem}
    >
      <i className="fa-regular fa-bells"></i>
    </button>
  );
};

export default ButtonNotification;
