import React, { memo, useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import styles from "./styles.module.scss";
import events from "events";
import { debounce } from "lodash";

export const loadingEvent = new events.EventEmitter();

function Loading() {
  const [isLoading, setIsLoading] = useState(false);
  const stack = useRef(0);
  useEffect(() => {
    loadingEvent.on("set", (args) => {
      if (args) {
        if (stack.current === 0) {
          setIsLoading(true);
          // setIsLoading(args)
          debounce(() => {
            setIsLoading(false);
            stack.current = 0;
          }, 7000);
        }
        stack.current++;
      } else {
        if (stack.current === 1) setIsLoading(false);
        stack.current--;
      }
    });
  }, []);

  if (!isLoading) return <></>;
  return (
    <div className={styles.container}>
      <RingLoader
        color={"#133ceb"}
        loading={true}
        cssOverride={{
          position: "fixed",
          top: "40%",
          left: "45%",
        }}
        size={150}
      />
    </div>
  );
}
export default memo(Loading);
