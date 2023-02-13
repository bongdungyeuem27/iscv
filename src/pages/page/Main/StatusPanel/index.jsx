import React, { useRef, useState } from 'react'
import styles from './styles.module.scss'
import avatar from '@asset/avatar_men.png'
import clsx from 'clsx'
import { Dropdown } from '@component/Dropdown'
import { typeStatus } from './typeStatus'

function Index() {
  const imageRef = useRef()
  const [image, setImage] = useState()
  const handleImage = () => {
    imageRef.current.click()
  }
  const [type, setType] = useState('')
  const [onShowType, setOnShowType] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          <img src={avatar}></img>
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.inputShow}>
            {type != 'normal' && (
              <div className={styles.showTypeWrapper}>
                <i className="fa-solid fa-star"></i>
                <a>{type}</a>
              </div>
            )}
            <textarea
              onChange={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight - 20}px`
              }}
              className={styles.inputArea}
              placeholder="Start post in your profile..."
            ></textarea>
            <div className={styles.showImage}>
              {image && <img src={URL.createObjectURL(image)}></img>}
            </div>
          </div>
          <div className={styles.sendWrapper}>
            <i className="fa-solid fa-paper-plane-top"></i>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div onClick={handleImage} className={styles.toolItem}>
          <input
            type="file"
            id="file"
            multiple={false}
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
            ref={imageRef}
            style={{ display: 'none' }}
          />
          <i className="fa-light fa-image"></i>
          <a>Image</a>
        </div>
        <Dropdown
          state={[onShowType, setOnShowType]}
          content={
            <div className={styles.setType}>
              {typeStatus.map((value, index) => {
                return (
                  <div
                    className={styles.itemSetType}
                    key={index}
                    onClick={() => {
                      setType(value)
                      setOnShowType(false)
                    }}
                  >
                    {value}
                  </div>
                )
              })}
            </div>
          }
        >
          <div
            onClick={() => {
              setOnShowType(true)
            }}
            className={styles.toolItem}
          >
            <i className="fa-light fa-chart-network"></i>
            <a>Type</a>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Index
