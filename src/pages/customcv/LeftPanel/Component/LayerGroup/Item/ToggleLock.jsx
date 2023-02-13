import React, { memo, useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { CustomCVContext } from '../../../../CustomCVContext'
import update from 'immutability-helper'
function Index(props) {
  const { index, id } = props
  const { list, setList } = useContext(CustomCVContext)
  return (
    <>
      {list[id].lock ? (
        <i
          onClick={() => setList(update(list, { [id]: { $merge: { lock: false } } }))}
          className={clsx('fa-solid fa-lock', styles.lock, styles.lockHidden)}
        ></i>
      ) : (
        <i
          onClick={() => setList(update(list, { [id]: { $merge: { lock: true } } }))}
          className={clsx('fa-solid fa-lock-open', styles.lock)}
        ></i>
      )}
    </>
  )
}
export default memo(Index)
