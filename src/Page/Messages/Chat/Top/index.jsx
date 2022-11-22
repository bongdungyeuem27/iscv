import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import Name from '../../Components/Name'
import Pin from '../../Components/Pin'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { Web3Context } from '@context/Web3ContextProvider'

function Index({ profile, id }) {
  const { loginState } = useContext(Web3Context)
  const [appointment, setAppointment] = useState()
  useEffect(() => {
    if (!id) return
    getContractEmployee().then((contractEmployee) => {
      contractEmployee.methods
        .getListAppointmentByEmployeeIdAndBusinessId(loginState.id, id)
        .call()
        .then((success) => {
          let temp = success.map((value, index) => {
            return { ...value }
          })
          setAppointment(temp)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }, [id])

  return (
    <div className={styles.top}>
      <div className={styles.info}>
        <Name avatar={profile.avatar} title={profile?.name} info={""}></Name>
        <div className={styles.tools}>
          <button className={styles.plus}>
            <i className="fa-regular fa-plus"></i>
          </button>
          <button className={styles.search}>
            <i className="fa-regular fa-search"></i>
          </button>
        </div>
      </div>
      <div>
        {appointment?.map((value, index) => {
          return <Pin key={index} {...value} {...profile}></Pin>
        })}
      </div>
    </div>
  )
}

export default Index
