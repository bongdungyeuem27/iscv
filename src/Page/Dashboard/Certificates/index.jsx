import React from 'react'
import styles from './styles.module.scss'
import { useSearchParams } from 'react-router-dom'
import Main from './Main'
import EmployeeCertificate from './EmployeeCertificate'
function Index() {
  const [searchParams] = useSearchParams()
  return (
    <div className={styles.container}>
      {(() => {
        if (searchParams.get('employeeid')) {
          return <EmployeeCertificate></EmployeeCertificate>
        }
        return <Main></Main>
      })()}
    </div>
  )
}

export default Index
