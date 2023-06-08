import { useContext } from "react";
import { useDragLayer } from "react-dnd";
import { CustomCVContext } from "../CustomCVContext";
import styles from "./styles.module.scss";

function getItemStyles(
  initialOffset: any,
  currentOffset: any,
  isSnapToGrid?: any
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    display: "inline-block",
    transform,
    WebkitTransform: transform,
  };
}

type Props = {};
export default function CustomDragLayer(props: Props) {
  const { list, setList } = useContext(CustomCVContext);
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  if (!isDragging) {
    return null;
  }
  return (
    <div className={styles.boardPreview}>
      <div
        style={{
          ...getItemStyles(initialOffset, currentOffset),
          // position: 'fixed',
          width: "100px",
          height: "30px",
          // zIndex: 20
        }}
        className={styles.active}
      >
        {/* {(() => {
          // switch (item.type) {
          //   case dataTypes.text.type:
          //     return <TextItem key={item.type} type={item.type} ></TextItem>
          //   case dataTypes.box.type:
          //     return <BoxItem key={item.type} type={item.type}></BoxItem>
          // }
          
        })()} */}
        <div>Test</div>
      </div>
    </div>
  );
}
