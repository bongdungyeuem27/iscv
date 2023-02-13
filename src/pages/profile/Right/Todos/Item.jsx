import React, { useState } from 'react'
import styles from './styles.module.scss'

function Index() {
  const [checked, setChecked] = useState(false)
  return (
    <div className={styles.item}>
      <div className={styles.round}>
        <input
          type="checkbox"
          id="checkbox"
          value={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
      <div className={styles.group}>
        <div className={styles.name}>Lam bai tap</div>
        <div className={styles.statusDeadline}>
          <p>In comming</p>
          <a>08:00 AM</a>
        </div>
      </div>
    </div>
  )
}

export default Index
