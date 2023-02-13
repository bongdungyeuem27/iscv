import React, { memo, useEffect } from 'react'
import styles from './styles.module.scss'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import clsx from 'clsx'

function Index(props) {
  const { type, icon } = props
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'box',
      item: { type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props]
  )
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])
  return (
    <div ref={drag} className={styles.item} role="DraggableBoxComponent">
      <span className={clsx({ [icon]: true }, styles.icon)}></span>
      <span className={styles.text}>{type}</span>
    </div>
  )
}

export default memo(Index)
