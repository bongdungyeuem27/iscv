import React from 'react'
import styles from './styles.module.scss'

function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.scroll}>
          {[...Array(20)].map((value, index) => {
            return (
              <div className={styles.itemWrapper}>
                <div className={styles.imageCover}>
                  <img src="https://vcdn1-giaitri.vnecdn.net/2020/03/06/TaylorSwift-1583461602-2814-1583461788.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=saCN0gu1ejADmfNdT4rh3A"></img>
                </div>
                <p>Name</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Index
