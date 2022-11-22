import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import PostStatus from '@component/PostItem/PostStatus'
import clsx from 'clsx'
import { getContract as getContractBusiness } from '@contract/businessController'
import _ from 'lodash'
import { getImage } from '@api/business/post'
import {useTranslation} from 'react-i18next'

function Item(props) {
  const { businessPostId, content, hashTag, id, imageSource, job, status, time } = props
  const navigate = useNavigate()
  const {t}= useTranslation('page', {keyPrefix: 'dashboard.posts'})
  const [list, setList] = useState()
  const [image, setImage] = useState()
  const gotoViewPost = () => {
    navigate(`/dashboard?tab=posts&businessPostId=${businessPostId}`)
  }
  useEffect(() => {
    getContractBusiness()
      .then((contract) => {
        contract.methods
          .getApplierOfPost(businessPostId)
          .call()
          .then((success) => {
            let temp = []
            _.forEach(success, (value, index) => {
              temp.push({ ...value })
            })
            setList(temp)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    getImage(id, imageSource)
      .then((success) => {
        setImage(success)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <tr onClick={gotoViewPost}>
      <td>
        <div class={styles.name}>
          <img src={image}></img>
          <p>{job}</p>
        </div>
      </td>
      <td>{new Date(time * 1000).toLocaleString()}</td>
      <td>
        <PostStatus type={status == 1 ? 'open' : status == 2 && 'closed'}></PostStatus>
      </td>
      <td>
        <div className={styles.detail}>
          {/* <div className={styles.recruit}>Mobile App</div> */}
          <p>{content}</p>
        </div>
      </td>
      <td>
        <div className={styles.apply}>
          <div className={styles.iconWrapper}>
            <div className={styles.icon}>
              <img
                className={styles.itemIcon}
                src="https://image.thanhnien.vn/1200x630/Uploaded/2022/zxaijr/2021_03_16/rosealbumkyluc1_lgic.png"
              ></img>
              <div className={clsx(styles.itemIcon, styles.push)}>+1</div>
            </div>
            <p className={styles.quantity}>
              {' '}
              {list?.length} {t('applier')}
            </p>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Item
