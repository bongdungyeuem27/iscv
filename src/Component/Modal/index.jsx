import React, { memo } from 'react'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

/**
 * to Create ModalWarning
 * @param [openModal, setOpenModalModal]: [openModal: boolean, setOpenModalModal: React.Dispatch<React.SetStateAction<boolean>>]
 * @param title: string
 * @param content: string
 * @param action: function
 * @returns
 */
function Index({
  action,
  nonaction,
  content,
  actionText,
  nonactionText,
  title,
  children,
  actionOutside,
  top,
  style,
  state,
}) {
  const [openModal, setOpenModal] = state
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
          {/* <div className={styles.container}> */}
          <div style={{ top: top, ...style }} className={styles.container}>
            <div className={styles.title}>
              <div className={styles.buttonWrapper}>
                <button
                  type="submit"
                  onClick={() => {
                    setOpenModal((e) => !e)
                  }}
                  className={styles.buttonClose}
                  // className="text-4xl text-white absolute top-0 right-2 align-center cursor-pointer alert-del"
                >
                  <i className={`fa-solid fa-xmark ${styles.iconClose}`}></i>
                </button>
              </div>
              <p className={styles.titleText}>{title ? title : t('title')}</p>
            </div>
            <div className={styles.contentWrapper}>{content ? content : children}</div>

            <div className={styles.end}>
              <div className={styles.endButtonWrapper}>
                {nonaction && (
                  <button
                    type="submit"
                    className={styles.cancel}
                    onClick={() => {
                      nonaction && nonaction()
                      setOpenModal((e) => !e)
                    }}
                  >
                    {nonactionText ? nonactionText : t('cancel')}
                  </button>
                )}
                {action && (
                  <button
                    type="submit"
                    className={styles.accept}
                    onClick={() => {
                      action ? action() : setOpenModal((e) => !e)
                    }}
                  >
                    {actionText ? actionText : t('oke')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default memo(Index)
