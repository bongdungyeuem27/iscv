import React, { memo, useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import update from 'immutability-helper'
import {CustomCVContext} from "../../../../CustomCVContext"

function Index(props) {
  const { index, id } = props
  const { list, setList } = useContext(CustomCVContext)
  return (
    <>
      {list[id].visible == 'hidden' ? (
        <i
          onClick={() => {
            setList(update(list, { [id]: { $merge: { visible: 'hidden' } } }))
          }}
          className={clsx('fa-solid fa-eye-slash', styles.view, styles.viewHidden)}
        ></i>
      ) : (
        <i
          onClick={() => {
            setList(update(list, { [id]: { $merge: { visible: '' } } }))
          }}
          className={clsx('fa-solid fa-eye', styles.view)}
        ></i>
      )}
    </>
  )
}
export default memo(Index)
