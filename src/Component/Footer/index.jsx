import logo from '@asset/LogoCV.png'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.teamContact}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.followUs}>
            <p>Follow us on: </p>
            <div className={styles.groupIcon}>
              <i className="fa-brands fa-facebook"></i>
            </div>
          </div>
          <div className={styles.contactBy}>
            <p className={styles.itemContact}>
              <i className="fa-regular fa-phone"></i>
              {/* +1-800-540-1086 */}
              <a href={'tel:0362117972'}>0362117972</a>
            </p>
            <p className={styles.itemContact}>
              <i className="fa-regular fa-at"></i>
              <a href={'mailto: 19521679@gm.uit.edu.vn'}>19521679@gm.uit.edu.vn</a>
            </p>
          </div>
        </div>
        {/* <div className={styles.groupLinks}>
          <div className={styles.content}>
            <div className={styles.itemLink}>
              <p className={styles.titleLink}>Top Websites</p>

              <Link to={'/'}>Top Websites</Link>
              <Link to={'/'}>Top Android Apps</Link>
              <Link to={'/'}>Top iOS</Link>
              <Link to={'/'}>Apps Digital 100 DigitalRank</Link>
              <Link to={'/'}>API Top Browsers</Link>
              <Link to={'/'}>Top Search Engines</Link>
              <Link to={'/'}>Mobile vs. Desktop Data</Link>
              <Link to={'/'}>Our Data Verify</Link>
              <Link to={'/'}>Your Website</Link>
              <Link to={'/'}>Browser Extension</Link>
              <Link to={'/'}>Privacy and Security</Link>
            </div>{' '}
            <div className={styles.itemLink}>
              <p className={styles.titleLink}>Top Android Apps</p>

              <Link to={'/'}>Top Websites</Link>
              <Link to={'/'}>Top Android Apps</Link>
              <Link to={'/'}>Top iOS</Link>
              <Link to={'/'}>Apps Digital 100 DigitalRank</Link>
              <Link to={'/'}>API Top Browsers</Link>
              <Link to={'/'}>Top Search Engines</Link>
              <Link to={'/'}>Mobile vs. Desktop Data</Link>
              <Link to={'/'}>Our Data Verify</Link>
              <Link to={'/'}>Your Website</Link>
              <Link to={'/'}>Browser Extension</Link>
              <Link to={'/'}>Privacy and Security</Link>
            </div>{' '}
            <div className={styles.itemLink}>
              <p className={styles.titleLink}>Top iOS</p>

              <Link to={'/'}>Top Websites</Link>
              <Link to={'/'}>Top Android Apps</Link>
              <Link to={'/'}>Top iOS</Link>
              <Link to={'/'}>Apps Digital 100 DigitalRank</Link>
              <Link to={'/'}>API Top Browsers</Link>
              <Link to={'/'}>Top Search Engines</Link>
              <Link to={'/'}>Mobile vs. Desktop Data</Link>
              <Link to={'/'}>Our Data Verify</Link>
              <Link to={'/'}>Your Website</Link>
              <Link to={'/'}>Browser Extension</Link>
              <Link to={'/'}>Privacy and Security</Link>
            </div>
            <div className={styles.itemLink}>
              <p className={styles.titleLink}>Apps Digital 100 DigitalRank</p>

              <Link to={'/'}>Top Websites</Link>
              <Link to={'/'}>Top Android Apps</Link>
              <Link to={'/'}>Top iOS</Link>
              <Link to={'/'}>Apps Digital 100 DigitalRank</Link>
              <Link to={'/'}>API Top Browsers</Link>
              <Link to={'/'}>Top Search Engines</Link>
              <Link to={'/'}>Mobile vs. Desktop Data</Link>
              <Link to={'/'}>Our Data Verify</Link>
              <Link to={'/'}>Your Website</Link>
              <Link to={'/'}>Browser Extension</Link>
              <Link to={'/'}>Privacy and Security</Link>
            </div>
            <div className={styles.itemLink}>
              <p className={styles.titleLink}>API Top Browsers</p>
              <Link to={'/'}>Top Websites</Link>
              <Link to={'/'}>Top Android Apps</Link>
              <Link to={'/'}>Top iOS</Link>
              <Link to={'/'}>Apps Digital 100 DigitalRank</Link>
              <Link to={'/'}>API Top Browsers</Link>
              <Link to={'/'}>Top Search Engines</Link>
              <Link to={'/'}>Mobile vs. Desktop Data</Link>
              <Link to={'/'}>Our Data Verify</Link>
              <Link to={'/'}>Your Website</Link>
              <Link to={'/'}>Browser Extension</Link>
              <Link to={'/'}>Privacy and Security</Link>
            </div>
          </div>
        </div> */}
      </div>
      <div className={styles.license}>
        <p>© FTISU 2022 All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
