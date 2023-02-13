import background from '@assets/background.jpg'
import { useTranslation } from 'react-i18next'
import ItemCategory from './ItemCategory'
import SlideShow from './SlideShow'
import { category } from './category'
import styles from './styles.module.scss'

const Home = () => {
  const { t, i18n } = useTranslation('page', { keyPrefix: 'home.index' })

  return (
    <main className={styles.container}>
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
                list={Object(category)[key].list}
                image={Object(category)[key].image}
              ></ItemCategory>
            )
          })}
        </div>
      </div>
      <SlideShow key={10}></SlideShow>
    </main>
  )
}

export default Home
