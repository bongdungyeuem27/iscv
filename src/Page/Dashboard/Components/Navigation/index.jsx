import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

function Index({ to, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {to && <Link to={to} className="fa-solid fa-angle-left"></Link>}
        <p>{title}</p>
      </div>
    </div>
  )
}

export default Index
