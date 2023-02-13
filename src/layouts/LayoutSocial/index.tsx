import Center from './Center'
import Left from './Left'
import Right from './Right'
import styles from './styles.module.scss'

export default function LayoutSocial() {
  return (
    <main className={styles.container}>
      <Left></Left>
      <Center></Center>
      <Right></Right>
    </main>
  )
}
