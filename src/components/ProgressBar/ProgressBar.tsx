import clsx from 'clsx'
import styles from './styles.module.scss'

function Index({
  percent,
  color,
  className
}: {
  percent: number
  color?: string
  className?: string
}) {
  return (
    <div className={clsx(styles.progressBar, className)}>
      <span
        style={
          {
            '--percent': (percent < 100 ? Math.round(percent) : 100) + '%',
            backgroundColor: color
          } as React.CSSProperties
        }
      ></span>
    </div>
  )
}

export default Index
