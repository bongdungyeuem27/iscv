import React from 'react'
import styles from './styles.module.scss'
import * as trademark from './images/index'
function Index() {
  const arrayItem = Object.keys(trademark)
  return (
    <div className={styles.container}>
      <div
        className={styles.loop}
        style={{
          width: arrayItem.length * 400 + 'px',
          animationDuration: (arrayItem.length + 2) * 1.5 + 's',
        }}
      >
        {arrayItem.map((key, index) => {
          return (
            <div key={index} style={{ width: '200px' }} className={styles.image}>
              <img  src={trademark[key]}></img>
            </div>
          )
        })}
        {arrayItem.map((key, index) => {
          return (
            <div key={2 * index} style={{ width: '200px' }} className={styles.image}>
              <img  src={trademark[key]}></img>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Index
