import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { Web3Context } from '@context/Web3ContextProvider'

function Index() {
  const { showMorePanel, setShowMorePanel } = useContext(Web3Context)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <label>Hi KMS</label>
            <p>Good morning</p>
          </div>
        </div>
        <div className={styles.tool}>
          <button
            id="header_button"
            onClick={() =>
              setShowMorePanel({
                show: showMorePanel.show == false ? true : showMorePanel.panel != 1 ? true : false,
                panel: 1,
              })
            }
          >
            <i className="fa-regular fa-user"></i>
          </button>
          <button
            id="header_button"
            onClick={() =>
              setShowMorePanel({
                show: showMorePanel.show == false ? true : showMorePanel.panel != 2 ? true : false,
                panel: 2,
              })
            }
          >
            <i className="fa-regular fa-bells"></i>
          </button>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.avatar}>
          <img src="https://vcdn1-giaitri.vnecdn.net/2020/03/06/TaylorSwift-1583461602-2814-1583461788.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=saCN0gu1ejADmfNdT4rh3A"></img>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.wrapper}>
          <label>189K</label>
          <p>Followers</p>
        </div>
        <div className={styles.wrapper}>
          <label>189</label>
          <p>Following</p>
        </div>
        <div className={styles.wrapper}>
          <label>189</label>
          <p>Posts</p>
        </div>
      </div>
    </div>
  )
}

export default Index
