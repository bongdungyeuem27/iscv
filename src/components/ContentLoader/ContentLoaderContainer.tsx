import clsx from 'clsx'
import styles from './styles.module.scss'

type Props = {
  className?: string
}

function Contentloader(props: Props) {
  return (
    <div className={clsx(styles.container, props.className)}>
      <div className={styles['lds-default']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Contentloader
