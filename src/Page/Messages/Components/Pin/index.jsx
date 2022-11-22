import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { getContract as getContractBusiness } from '@contract/businessController'

function Index({ applyId, appointmentId, businessId, employeeId, status, time, name }) {
  const [post, setPost] = useState()
  useEffect(() => {
    getContractBusiness()
      .then((contractBusiness) => {
        contractBusiness.methods
          .getApply(applyId)
          .call()
          .then((apply) => {
            contractBusiness.methods
              .getPost(apply.postId)
              .call()
              .then((success) => {
                setPost({ ...success })
              })
              .catch((error) => console.error(error))
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error)
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.pinBlur}></div>
      <div className={styles.iconPin}>
        <i className="fa-solid fa-thumbtack"></i>
      </div>
      <div className={styles.text}>
        <div className={styles.title}>Ban co mot lich hen phong van o {name}</div>
        <div className={styles.contentPin}>
          <a>{post?.job}</a>
          <p> {post?.content}</p>
        </div>
      </div>
      <div className={styles.tool}>
        <div className={styles.appointmentTime}>{new Date(parseInt(time)).toLocaleString()}</div>
      </div>
    </div>
  )
}

export default Index
