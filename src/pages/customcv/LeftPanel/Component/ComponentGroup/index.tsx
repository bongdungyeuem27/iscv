import React, { useContext, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { CustomCVContext } from "../../../CustomCVContext";
import Item from "./Item";
import { designTabComponents } from "../../../ItemTypes";

type Props = {
  style?: React.CSSProperties;
};

function Index(props: Props) {
  const { layerGroupDimension } = useContext(CustomCVContext);
  const toolboxRef = useRef<any>(null);
  useEffect(() => {
    if (layerGroupDimension && toolboxRef.current) {
      let dy = Math.round(
        layerGroupDimension.top - toolboxRef.current.offsetTop!
      );
      toolboxRef.current.style!.height = dy + "px";
    }
  }, [layerGroupDimension, toolboxRef.current]);

  return (
    <div className={clsx(styles.container)} style={props.style}>
      <div className={styles.title}>
        <div className={styles.titleContainer}>
          <p className={styles.titleText}>Component</p>
          <i className={clsx("fa-light fa-magnifying-glass")}></i>
        </div>
      </div>
      <div ref={toolboxRef} className={styles.toolbox}>
        <div className={styles.toolboxScrollContainer}>
          {Object.keys(designTabComponents).map((key, index) => {
            return (
              <Item
                key={index}
                index={index}
                type={key}
                icon={designTabComponents[key].icon}
              ></Item>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Index;
