import React from 'react'
import styles from './styles.module.scss'
function Index(props) {
  const { value, onChange, placeholder } = props
  return (
    <textarea
      className={styles.container}
      value={value}
      onChange={(e) => {
        e.target.style.height = 'inherit'
        e.target.style.height = `${e.target.scrollHeight}px`
        onChange(e.target.value)
      }}
      rows={1}
      placeholder={placeholder}
    ></textarea>
  )
}

export default Index
