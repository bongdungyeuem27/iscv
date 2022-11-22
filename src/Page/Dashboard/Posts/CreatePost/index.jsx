import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from './styles.module.scss'
import PostItem from '@component/PostItem'
import { Dropdown } from '@component/Dropdown'
import TextField from '@component/TextField'
import { Web3Context } from '@context/Web3ContextProvider'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useLoading } from '@component/Loading'
import { useToast } from '@component/Toast'
import { getContract } from '@contract/businessController'
import Navigation from '../../Components/Navigation'
import { postImage } from '@api/business/post'
import { useTranslation } from 'react-i18next'
// Page/Create Post
function Index() {
  const [hashtag, setHashtag] = useState('hashtag')
  const [openHashtag, setOpenHashtag] = useState(false)
  const [content, setContent] = useState('')
  const [job, setJob] = useState('')
  const navigate = useNavigate()
  const loading = useLoading()
  const toast = useToast()
  const [image, setImage] = useState()
  const { loginState } = useContext(Web3Context)
  const openImageRef = useRef()
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.createPost' })
  const handlePublish = async () => {
    loading.open()
    await getContract()
      .then(async (success) => {
        await postImage(image, loginState.id)
          .then(async (imageResult) => {
            await success.methods
              .addPost(loginState.id, hashtag, job, content, imageResult.data.name, 1)
              .send({ from: loginState.address })
              .then(async (success) => {
                toast.success('success', { pauseOnHover: true, closeOnClick: true })
                navigate('/dashboard?tab=posts')
              })
              .catch((error) => {
                console.error(error)
                if (error.code === 4001)
                  toast.warning('chua thanh toan', { pauseOnHover: true, closeOnClick: true })
                toast.error('error', { pauseOnHover: true, closeOnClick: true })
              })
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.log(error))

    loading.close()
  }
  return (
    <div className={styles.container}>
      <Navigation title={t('create_post')} to={-1}></Navigation>

      <div className={styles.group}>
        <div className={styles.left}>
          <div className={styles.image}>
            <div className={styles.panelTitle}>
              <a>{t('media')}</a>
            </div>
            <button onClick={() => openImageRef.current.click()} className={styles.imageTool}>
              <i className="fa-regular fa-hexagon-image"></i>
              <a>{t('add_photo')}</a>
              <input
                type="file"
                id="file"
                multiple="false"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => setImage(e.target.files[0])}
                ref={openImageRef}
                style={{ display: 'none' }}
              />
            </button>
          </div>
          <div className={styles.job}>
            <div className={styles.panelTitle}>
              <a>{t('skills')}</a>
            </div>
            <input
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className={styles.jobInput}
              placeholder={t('type_your_skills_needed')}
            ></input>
          </div>
          <div className={styles.content}>
            <div className={styles.panelTitle}>
              <a>{t('content')}</a>
            </div>
            <Dropdown
              content={
                <div className={styles.contentDropdown}>
                  <span
                    onClick={() => {
                      setHashtag('common')
                      setOpenHashtag(false)
                    }}
                  >
                    {'common'}
                  </span>
                  <span
                    onClick={() => {
                      setHashtag('recruit')
                      setOpenHashtag(false)
                    }}
                  >
                    {'recruit'}
                  </span>
                </div>
              }
              state={[openHashtag, setOpenHashtag]}
            >
              <div onClick={() => setOpenHashtag(true)} className={styles.hashtag}>
                <i className={'fa-solid fa-star'}></i>
                <a>{hashtag}</a>
              </div>
            </Dropdown>

            <TextField
              value={content}
              onChange={setContent}
              placeholder={t('describe')}
            ></TextField>
            <div className={styles.tool}></div>
          </div>

          <div className={styles.button}>
            <button onClick={handlePublish} className={styles.publish}>
              {t('publish')}
            </button>
            <Link to="/dashboard?tab=posts" className={styles.cancel}>
              {t('cancel')}
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          {/* {console.log(image)} */}
          <PostItem
            name={loginState.name}
            time={new Date().getTime() / 1000}
            content={content}
            job={job}
            id={loginState.id}
            hashTag={hashtag}
            status={1}
            typeFor={'business'}
            imageSource={image}
            disabled
          ></PostItem>
        </div>
      </div>
    </div>
  )
}

export default Index
