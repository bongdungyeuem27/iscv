import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

function Index() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Link to="/files/instruction.pdf" target="_blank" download className={styles.download}>
          Download Instruction
        </Link>
      </div>
    </div>
  )
}

export default Index
