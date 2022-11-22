import React, { useState } from 'react'
import { Tooltip } from '@component/Tooltip'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { LANGUAGES } from '@constant/languageConst'
import * as flag from '../../Asset/image/flag'
import _ from 'lodash'
import Modal from '@component/Modal'

const list = [LANGUAGES[0], LANGUAGES[1]]

export default function Index() {
  const { t, i18n } = useTranslation('component', { keyPrefix: 'language.index' })
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal state={[open, setOpen]} title={t('change_language')}>
        <ul className={styles.ulLanguage}>
          {list.map((value, index) => {
            return (
              <div key={index} className={styles.buttonWrapper}>
                <div
                  key={index}
                  className={clsx(styles.languageButtonList, {
                    [styles.active]: i18n.language == value.value,
                  })}
                  onClick={() => i18n.changeLanguage(value.value)}
                >
                  <img src={flag[value.value]}></img>
                  <div className={styles.buttonSelect}>{value.name}</div>
                </div>
                <hr></hr>
              </div>
            )
          })}
        </ul>
      </Modal>
      {(() => {
        let item = _.find(list, (e) => {
          if (e.value === i18n.language) return true
        })
        return (
          <div onClick={() => setOpen(true)} className={clsx(styles.languageButton)}>
            <img src={flag[i18n.language]}></img>
            {/* <div className={styles.buttonSelect}>{item.name}</div> */}
          </div>
        )
      })()}
    </>
  )
}
