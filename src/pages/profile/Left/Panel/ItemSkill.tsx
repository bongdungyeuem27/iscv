import { ProgressBar } from '@components/ProgressBar';
import styles from './styles.module.scss';

function Index(props: { title: string; level: number }) {
  const { title, level } = props
  return (
    <div className={styles.item}>
      <div className={styles.skillTextWrapper}>
        <label>{title}</label>
        <a>{level}%</a>
      </div>
      <ProgressBar percent={level}></ProgressBar>
    </div>
  )
}

export default Index
