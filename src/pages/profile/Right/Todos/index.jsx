import React, { useState } from 'react'
import styles from './styles.module.scss'
import Calendar from 'react-calendar'
import './calendar.scss'
import Item from './Item'

function Index() {
  const [value, onChange] = useState(new Date())
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Todos</div>
        <div className={styles.seeMore}>See more</div>
      </div>
      <div className={styles.calendarWrapper}>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div className={styles.todoListWrapper}>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
      </div>
    </div>
  )
}

export default Index
