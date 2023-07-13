import Container from './Container'
import CustomDragLayer from './CustomDragLayer'
import styles from './styles.module.scss'

function Index() {
  return (
    <div className={styles.index}>
      <Container snapToGrid={true} />
      <CustomDragLayer></CustomDragLayer>
    </div>
  )
}

export default Index
