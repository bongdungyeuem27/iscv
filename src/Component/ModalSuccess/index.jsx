import React, { memo, useState, useContext } from 'react'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

/**
 * to Create ModalWarning
 * @param [openModal, setOpenModal]: [openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>]
 * @param title: string
 * @param content: string
 * @param action: function
 * @param actionText: HTMLDivElement
 * @param nonaction: function
 * @param nonactionText: HTMLDivElement
 * @returns
 */
function Index(props) {
  const [openModal, setOpenModal] = props.state
  const { action, nonaction, content, actionText, nonactionText, title, actionOutside } = props
  const { t } = useTranslation('')
  return (
    <>
      {openModal && (
        <>
          <div
            className={styles.wrapper}
            // className="w-[100vw] h-[100vh] top-0 fixed bg-slate-700 z-[8] opacity-60"
            onClick={() => {
              actionOutside && actionOutside()
              setOpenModal((e) => !e)
            }}
          ></div>
          <div className={styles.container}>
            <div className={styles.title}>
              <div className={styles.buttonWrapper}>
                <button
                  onClick={() => {
                    setOpenModal((e) => !e)
                  }}
                  className={styles.buttonClose}
                  // className="text-4xl text-white absolute top-0 right-2 align-center cursor-pointer alert-del"
                >
                  <i className={`fa-solid fa-xmark ${styles.iconClose}`}></i>
                </button>
              </div>
              <p className={styles.titleText}>
                <i className={`fa-solid fa-exclamation ${styles.icon}`}></i>
                {title ? title : t('success')}
              </p>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.group}>{content ? content : t('success')}</div>

              <div className={styles.end}>
                {nonactionText && (
                  <button
                    className={styles.cancel}
                    onClick={() => {
                      nonaction && nonaction()
                      setOpenModal((e) => !e)
                    }}
                  >
                    {nonactionText ? nonactionText : t('cancel')}
                  </button>
                )}
                <button
                  className={styles.accept}
                  onClick={() => {
                    action ? action() : setOpenModal((e) => !e)
                  }}
                >
                  {actionText ? actionText : t('oke')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default memo(Index)
