import { useContext } from 'react'
import { CustomCVContext } from '../CustomCVContext'
import Container from './Container'
import CustomDragLayer from './CustomDragLayer'
import styles from './styles.module.scss'

function Index() {
  const { selected, selectedFor, setSelectedFor } = useContext(CustomCVContext)
  return (
    <div className={styles.index}>
      <Container snapToGrid={true} />
      <CustomDragLayer></CustomDragLayer>
    </div>
  )
}

export default Index
