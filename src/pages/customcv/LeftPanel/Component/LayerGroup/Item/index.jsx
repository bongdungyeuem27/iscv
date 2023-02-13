import React, { useState, memo, useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import ToggleLock from './ToggleLock'
import ToggleHidden from './ToggleHidden'
import Text from './Text'
import { CustomCVContext } from '../../../../CustomCVContext'

function Index(props) {
  const { index, id, name } = props
  const { selected, setSelected, doubleClick, setDoubleClick } = useContext(CustomCVContext)
  // const [lock, setLock] = useState(false)
  // const [hidden, setHidden] = useState(false)
  const handleClick = (e) => {
    setSelected(id)
  }
  return (
    <div
      onClick={handleClick}
      className={clsx(styles.container, { [styles.active]: selected == id ? true : false })}
    >
      <i className="fa-solid fa-folder"></i>
      <Text index={index} id={id} name={name}></Text>
      <div className={styles.toolbox}>
        <ToggleLock key={0} id={id}></ToggleLock>
        <ToggleHidden key={1} id={id}></ToggleHidden>
      </div>
    </div>
  )
}

export default memo(Index)
