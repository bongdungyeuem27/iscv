import React, { useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'
import background from '@asset/background.jpg'
import SlideShow from './SlideShow'
import ItemCategory from './ItemCategory'
import Footer from '@component/Footer'
import { category } from './category'
const Index = () => {
  const { t, i18n } = useTranslation('page', { keyPrefix: 'home.index' })

  return (
    <>
      <section className={styles.container}>
        <div style={{ backgroundImage: `url(${background})` }} className={styles.background}>
          <div className={styles.left}>
            <div className={styles.title}>Think. Make. Solve.</div>
            <div className={styles.boxMid}>
              <div className={styles.dash}></div>
              <div className={styles.text}>What we do</div>
            </div>
            <div className={styles.content}>
              We enjoy creating delightful,
              <br></br>
              human-centered digital experiences
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
        <div className={styles.category}>
          <div className={styles.categoryTitle}>
            <a>{t('categories')}</a>
          </div>
          <div className={styles.categoryItemWrapper}>
            {Object.keys(category).map((key) => {
              return (
                <ItemCategory
                  key={key}
                  name={key}
                  list={category[key].list}
                  image={category[key].image}
                ></ItemCategory>
              )
            })}
          </div>
        </div>
        <SlideShow key={10}></SlideShow>
      </section>
      <Footer key={11}></Footer>
    </>
  )
}

export default Index
