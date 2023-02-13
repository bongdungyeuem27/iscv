import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { CustomCVContext } from '../../../CustomCVContext'
import clsx from 'clsx'
import update from 'immutability-helper'
import { customStyles, optionsBorderStyle } from '../../../config'
import Select from 'react-select'
function Index() {
  const { list, setList, selected, linkColor, setLinkColor } = useContext(CustomCVContext)
  return (
    <>
      {selected && (
        <div className={styles.container}>
          <div className={styles.title}>Style</div>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div className={clsx(styles.item)}>
                <div className={styles.colorText}>Background</div>
                <div
                  style={{
                    background: list[selected].background.hex,
                  }}
                  className={styles.colorBox}
                ></div>
                <i
                  onClick={() => {
                    if (selected == linkColor.id && linkColor.for == 'background') {
                      setLinkColor({})
                    } else {
                      setLinkColor({ id: selected, for: 'background' })
                    }
                  }}
                  className={clsx('fa-thin fa-link-horizontal', {
                    [styles.active]: selected == linkColor.id && linkColor.for == 'background',
                  })}
                ></i>
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx(styles.item)}>
                <div className={styles.colorText}>Border</div>
                <input
                  value={list[selected].borderWidth}
                  onChange={(e) =>
                    setList(
                      update(list, { [selected]: { $merge: { borderWidth: e.target.value } } })
                    )
                  }
                ></input>
                <Select
                  styles={customStyles}
                  menuPlacement="auto"
                  value={list[selected].borderStyle}
                  onChange={(e) => {
                    setList(update(list, { [selected]: { $merge: { borderStyle: e } } }))
                  }}
                  options={optionsBorderStyle}
                  //   onFocus={() => console.log('focus')}
                  className={styles.borderStyle}
                />
                <div
                  style={{
                    background: list[selected].borderColor.hex,
                  }}
                  className={styles.colorBox}
                ></div>
                <i
                  onClick={() => {
                    if (selected == linkColor.id && linkColor.for == 'borderColor') {
                      setLinkColor({})
                    } else {
                      setLinkColor({ id: selected, for: 'borderColor' })
                    }
                  }}
                  className={clsx('fa-thin fa-link-horizontal', {
                    [styles.active]: selected == linkColor.id && linkColor.for == 'borderColor',
                  })}
                ></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Index
