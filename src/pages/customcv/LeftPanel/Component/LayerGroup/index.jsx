import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { ResizeableContainer } from '@component/Resizeable'
import Item from './Item'
import { CustomCVContext } from '@page/CustomCV/CustomCVContext'

const minHeight = 300
function Index() {
  const {
    list,
    setList,
    layerGroupDimension,
    setLayerGroupDimension,
    selected,
    doubleClick,
    setDoubleClick,
  } = useContext(CustomCVContext)
  const layerRef = useRef()
  const resizeLayerGroup = useRef()

  useEffect(() => {
    let dy = Math.round(window.innerHeight - layerRef.current.getBoundingClientRect().top)
    if (dy < minHeight) return
  }, [resizeLayerGroup.current])

  useLayoutEffect(() => {
    if (selected != doubleClick) {
      setDoubleClick(false)
    }
  }, [selected, doubleClick])
  return (
    <ResizeableContainer
      endResize={resizeLayerGroup}
      dimension={{
        top: 250,
        // height: Math.round(window.innerHeight - Math.round(window.innerHeight * 0.4)),
      }}
      resizeTop
      setDimension={setLayerGroupDimension}
      active
      minTop={100}
      style={{
        zIndex: 8,
        // left: 0,
        width: '100%',
        bottom: 0,
      }}
    >
      <div className={clsx(styles.layer)}>
        <div className={styles.layerTitle}>
          <div className={styles.layerContainer}>
            <p className={styles.layerText}>LAYERS</p>
            <i className={clsx('fa-light fa-magnifying-glass')}></i>
          </div>
        </div>
        <div ref={layerRef} className={styles.layerWrapper}>
          <div className={styles.layerScroll}>
            {Object.keys(list).map((id, index) => (
              <Item key={index} id={id} index={index} name={list[id].name}></Item>
            ))}
          </div>
        </div>
      </div>
    </ResizeableContainer>
  )
}

export default Index
