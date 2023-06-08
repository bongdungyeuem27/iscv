import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import Item from "./Item";
import { CustomCVContext } from "@pages/customcv/CustomCVContext";

type Props = {
  style?: React.CSSProperties;
};

const minHeight = 300;
function Index(props: Props) {
  const {
    list,
    setList,
    layerGroupDimension,
    setLayerGroupDimension,
    selected,
    doubleClick,
    setDoubleClick,
  } = useContext(CustomCVContext);
  const layerRef = useRef<any>();
  const resizeLayerGroup = useRef<any>();

  useEffect(() => {
    const dy = Math.round(
      window.innerHeight - layerRef.current!.getBoundingClientRect!().top
    );
    if (dy < minHeight) return;
  }, [resizeLayerGroup.current]);

  useLayoutEffect(() => {
    if (selected != doubleClick) {
      setDoubleClick(false);
    }
  }, [selected, doubleClick]);
  return (
    <div style={props.style}>
      <div className={clsx(styles.layer)}>
        <div className={styles.layerTitle}>
          <div className={styles.layerContainer}>
            <p className={styles.layerText}>LAYERS</p>
            <i className={clsx("fa-light fa-magnifying-glass")}></i>
          </div>
        </div>
        <div ref={layerRef} className={styles.layerWrapper}>
          <div className={styles.layerScroll}>
            {Object.keys(list).map((id, index) => (
              <Item
                key={index}
                id={id}
                index={index}
                name={list[id].name}
              ></Item>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
