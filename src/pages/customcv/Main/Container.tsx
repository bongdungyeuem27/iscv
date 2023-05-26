import { useCallback, useContext, useEffect } from "react";
import { useDrop } from "react-dnd";
import { DraggableBox } from "./DraggableBox";

import events from "events";
import { CustomCVContext } from "../CustomCVContext";
import { BOARDDIMENSION } from "../config";
import { snapToGrid as doSnapToGrid } from "./snapToGrid";
import styles from "./styles.module.scss";

import useInitComponent from "../hooks/useInitComponent";
export const customcvEmitter = new events.EventEmitter();

const boardDimension = {
  left: window.screen.width / 2 - BOARDDIMENSION.width / 2,
  top: BOARDDIMENSION.top,
  width: BOARDDIMENSION.width,
  height: BOARDDIMENSION.height,
};

type Props = {
  snapToGrid: any;
};

export default function Container(props: Props) {
  const { snapToGrid } = props;

  const { list, setList, setSelected, getNewAutoCreatement } =
    useContext(CustomCVContext);

  const addComponent = useCallback(useInitComponent, [list]);
  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item, monitor) {
        let left, top;
        let boardPosition = {
          left: boardDimension.left,
          top: boardDimension.top,
        };
        let newBoxPosition = {
          left: monitor?.getClientOffset()?.x,
          top: monitor.getClientOffset()?.y,
        };
        left = Math.round(newBoxPosition?.left! - boardPosition.left);
        top = Math.round(newBoxPosition?.top! - boardPosition.top);
        if (snapToGrid) {
          [left, top] = doSnapToGrid(left, top);
        }
        if (left < 0 || left > boardDimension.width) return;
        if (top < 0 || top > boardDimension.height) return;
        addComponent(
          (item as any).type,
          top,
          left,
          getNewAutoCreatement,
          list,
          setList,
          setSelected
        );
        return undefined;
      },
    }),
    [list]
  );
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("load", () => {
        let scrollElement = document.getElementById("custom_board");
        scrollElement!.scrollLeft =
          (scrollElement!.scrollWidth - scrollElement!.clientWidth) / 2;
      });
    }, 1000);
  }, []);

  return (
    <div
      ref={drop}
      id={"custom_board"}
      style={boardDimension}
      className={styles.board}
    >
      <div id="draw_child" className={styles.drawChild}>
        {Object.keys(list).map((id, index) => {
          return (
            <DraggableBox key={index} id={id} />
          );
        })}
        <div
          id="draw_table"
          style={{ width: "100%", height: "100%", background: "white" }}
        ></div>
      </div>
    </div>
  );
}
