import { useContext } from 'react'
import { useDragLayer } from 'react-dnd'
import { dataTypes } from '../ItemTypes'
import { CustomCVContext } from '../CustomCVContext'
import styles from './styles.module.scss'
import TextItem from './Component/TextItem'
import BoxItem from './Component/BoxItem'

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  let { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    display: 'inline-block',
    transform,
    WebkitTransform: transform,
  }
}
export default function CustomDragLayer(props) {
  const { list, setList } = useContext(CustomCVContext)
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  if (!isDragging) {
    return null
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
        {(() => {
          // switch (item.type) {
          //   case dataTypes.text.type:
          //     return <TextItem key={item.type} type={item.type} ></TextItem>
          //   case dataTypes.box.type:
          //     return <BoxItem key={item.type} type={item.type}></BoxItem>
          // }
          
        })()}
        <div>Test</div>
      </div>
    </div>
  )
}
