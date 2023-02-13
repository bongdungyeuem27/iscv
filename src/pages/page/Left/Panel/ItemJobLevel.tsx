import styles from './styles.module.scss'

function Index(props: { title: string; level: number; point: number }) {
  const { title, level, point } = props
  return (
    <div className={styles.item}>
      <div className={styles.skillTextWrapper}>
        <label>{title}</label>
        <a>{level}</a>
        <a>{point}</a>
      </div>
    </div>
  )
}

export default Index
