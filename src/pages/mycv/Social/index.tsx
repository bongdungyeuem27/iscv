import githubIcon from '../images/github.png'
import linkedinIcon from '../images/linkedin.png'
import styles from './styles.module.scss'

function Index({ github, linkedin }: { github: string; linkedin: string }) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.item}>
        <div className={styles.image}>
          <img src={facebookIcon}></img>
        </div>
        <div className={styles.group}>
          <div className={styles.title}>Facebook</div>
          <div className={styles.content}>facebook.com</div>
        </div>
      </div> */}
      {github && (
        <div className={styles.item}>
          <div className={styles.image}>
            <img src={githubIcon}></img>
          </div>
          <div className={styles.group}>
            <div className={styles.title}>Github</div>
            <div className={styles.content}>{github}</div>
          </div>
        </div>
      )}
      {linkedin && (
        <div className={styles.item}>
          <div className={styles.image}>
            <img src={linkedinIcon}></img>
          </div>
          <div className={styles.group}>
            <div className={styles.title}>LinkedIn</div>
            <div className={styles.content}>{linkedin}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Index
