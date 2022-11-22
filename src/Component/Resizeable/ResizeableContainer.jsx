import React, { useRef, useEffect, useCallback } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

function ResizeableContainer(props) {
  const {
    active,
    resizeTop,
    resizeRight,
    resizeBottom,
    resizeLeft,
    children,
    style,
    activeStyle,
    dimension,
    setDimension,
    minTop,
    minLeft,
    minRight,
    minBottom,
    endResize,
    getIsStartResizing,
  } = props
  var { minWidth, minHeight } = props
  if (!minWidth) {
    minWidth = 10
  }
  if (!minHeight) {
    minHeight = 10
  }
  const ref = useRef(null)
  const refLeft = useRef(null)
  const refTop = useRef(null)
  const refRight = useRef(null)
  const refBottom = useRef(null)

  useEffect(() => {
    const resizeableEle = ref.current
    let top = dimension.top
    let left = dimension.left
    let width = dimension.width
    let height = dimension.height
    resizeableEle.style.top = top + 'px'
    resizeableEle.style.left = left + 'px'
    resizeableEle.style.width = width + 'px'
    resizeableEle.style.height = height + 'px'

    let preXDrag = 0
    let preYDrag = 0

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - preXDrag
      if (dx == 0) return
      if (width + dx <= minWidth && dx < 0) {
        if (width + dx == minWidth) {
          return
        }
        width = minWidth
        preXDrag = left + minWidth
      } else {
        width = width + dx
        preXDrag = event.clientX
      }
      resizeableEle.style.width = `${width}px`
    }

    const onMouseUpRightResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveRightResize)
      setDimension && setDimension({ top, left, width, height })
    }

    const onMouseDownRightResize = (event) => {
      preXDrag = event.clientX
      document.addEventListener('mousemove', onMouseMoveRightResize)
      document.addEventListener('mouseup', onMouseUpRightResize)
    }

    // Top resize
    const onMouseMoveTopResize = (event) => {
      let dy = event.clientY - preYDrag
      if (dy == 0) return
      if (height - dy <= minHeight && dy > 0) {
        if (height - dy == minHeight) {
          return
        }
        top = top + height - minHeight
        height = minHeight
        preYDrag = top
      } else {
        if (minTop && top < minTop && dy < 0) {
          if (top - dy <= minTop) {
            return
          }
        } else {
          height = height - dy
          preYDrag = event.clientY
          top = top + dy
        }
      }

      resizeableEle.style.top = top + 'px'
      resizeableEle.style.height = `${height}px`
    }

    const onMouseUpTopResize = (event) => {
      endResize.current = { top, left, width, height }
      document.removeEventListener('mousemove', onMouseMoveTopResize)
      setDimension && setDimension({ top, left, width, height })
    }

    const onMouseDownTopResize = (event) => {
      preYDrag = event.clientY

      document.addEventListener('mousemove', onMouseMoveTopResize)
      document.addEventListener('mouseup', onMouseUpTopResize)
    }

    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - preYDrag
      if (dy == 0) return
      if (height + dy <= minHeight && dy < 0) {
        if (height + dy == minHeight) {
          return
        }
        height = minHeight
        preYDrag = top + minHeight
      } else {
        height = height + dy
        preYDrag = event.clientY
      }
      resizeableEle.style.height = `${height}px`
    }

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveBottomResize)
      setDimension && setDimension({ top, left, width, height })
    }

    const onMouseDownBottomResize = (event) => {
      preYDrag = event.clientY
      document.addEventListener('mousemove', onMouseMoveBottomResize)
      document.addEventListener('mouseup', onMouseUpBottomResize)
    }

    // Left resize
    const onMouseMoveLeftResize = (event) => {
      let dx = event.clientX - preXDrag
      if (dx == 0) return
      if (width - dx <= minWidth && dx > 0) {
        if (width - dx == minWidth) {
          return
        }
        left = left + width - minWidth
        width = minWidth
        preXDrag = left
      } else {
        width = width - dx
        preXDrag = event.clientX
        left = left + dx
      }

      resizeableEle.style.left = left + 'px'
      resizeableEle.style.width = `${width}px`
    }

    const onMouseUpLeftResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveLeftResize)
      setDimension && setDimension({ top, left, width, height })
    }

    const onMouseDownLeftResize = (event) => {
      preXDrag = event.clientX
      document.addEventListener('mousemove', onMouseMoveLeftResize)
      document.addEventListener('mouseup', onMouseUpLeftResize)
    }

    // Add mouse down event listener
    if (active) {
      resizeRight && refRight.current.addEventListener('mousedown', onMouseDownRightResize)
      resizeTop && refTop.current.addEventListener('mousedown', onMouseDownTopResize)
      resizeBottom && refBottom.current.addEventListener('mousedown', onMouseDownBottomResize)
      resizeLeft && refLeft.current.addEventListener('mousedown', onMouseDownLeftResize)
    }
    setDimension && setDimension({ top, left, width, height })
    return () => {
      resizeRight &&
        resizeRight.current &&
        refRight.current.removeEventListener('mousedown', onMouseDownRightResize)
      refTop &&
        refTop.current &&
        refTop.current.removeEventListener('mousedown', onMouseDownTopResize)
      refBottom &&
        refBottom.current &&
        refBottom.current.removeEventListener('mousedown', onMouseDownBottomResize)
      refLeft &&
        refLeft.current &&
        refLeft.current.removeEventListener('mousedown', onMouseDownLeftResize)
    }
  }, [active])

  return (
    <div
      ref={ref}
      style={style}
      className={clsx(styles.resizeable, { [styles.active]: activeStyle || active })}
    >
      {resizeRight && <div ref={refRight} className={clsx(styles.resizer, styles.resizerR)}></div>}
      {resizeTop && <div ref={refTop} className={clsx(styles.resizer, styles.resizerT)}></div>}
      {resizeBottom && (
        <div ref={refBottom} className={clsx(styles.resizer, styles.resizerB)}></div>
      )}
      {resizeLeft && <div ref={refLeft} className={clsx(styles.resizer, styles.resizerL)}></div>}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default ResizeableContainer
