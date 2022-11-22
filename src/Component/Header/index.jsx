import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Web3Context } from '../../Context/Web3ContextProvider'
import { useTranslation } from 'react-i18next'
import Language from '@component/Language'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { listMenuHeader } from './listMenuHeader'
import logo from '@asset/LogoCV.png'

export default function Header() {
  const location = useLocation()
  const [showMobile, setShowModile] = useState(false)
  const { loginState, dispatchLogin, setComplete, setShowMorePanel } = useContext(Web3Context)
  const { t } = useTranslation('component', { keyPrefix: 'header.index' })
  async function handleConnectMetamask() {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    let addressTemp = accounts[0]
    if (addressTemp) {
      setComplete(false)
    }
  }

  return (
    <header id="header" className={clsx(styles.container)}>
      <div className={styles.toggleNavigation} onClick={() => setShowModile(!showMobile)}>
        {showMobile ? (
          <i key={0} className="fa-regular fa-xmark"></i>
        ) : (
          <i key={1} className="fa-regular fa-list-ul"></i>
        )}
      </div>
      <div className={clsx(styles.navMobile, { [styles.showMobile]: showMobile })}>
        <div className={styles.textModileTitle}>{t('navigation')}</div>
        <ul>
          {listMenuHeader.map((value, index) => {
            return (
              <Link key={index} to={value.to}>
                <div className={styles.icon}>
                  <i className={value.icon}></i>
                </div>
                <div className={styles.name}>{t(value.name.toString())}</div>
              </Link>
            )
          })}
        </ul>
      </div>
      <div className={styles.navLeft}>
        <Link key="header_icon" to="/">
          <img className={styles.logo} alt="Logo" src={logo}></img>
        </Link>
      </div>
      <nav id="navbar" className={clsx(styles.navCenter)}>
        <ul>
          {listMenuHeader.map((value, index) => {
            return (
              <Link
                key={index}
                to={value.to}
                className={clsx(styles.navItem, { [styles.active]: location.pathname == value.to })}
              >
                <i className={value.icon}></i>
                <div className={styles.name}>{t(value.name.toString())}</div>
              </Link>
            )
          })}
        </ul>
      </nav>
      <nav id="navbar" className={clsx(styles.navRight)}>
        <Language key={0}></Language>
        <Link to="/messages" key={6} className={styles.buttonItem}>
          <i className="fa-solid fa-comment-lines"></i>
        </Link>
        <button
          onClick={() => {
            setShowMorePanel((e) => {
              return {
                show: e.show == false ? true : e.panel != 2 ? true : false,
                panel: 2,
              }
            })
          }}
          id="header_button"
          key={5}
          className={styles.buttonItem}
        >
          <i className="fa-regular fa-bells"></i>
        </button>

        {!loginState.address && (
          <button key={1} onClick={handleConnectMetamask} className={styles.buttonAccount}>
            {t('connect_metamask')}
          </button>
        )}
        {loginState.address && !loginState.isLoggedIn && (
          <Link key={3} to="/login" className={styles.buttonAccount}>
            {t('login')}
          </Link>
        )}
        {loginState.address && loginState.isLoggedIn && (
          <div
            id="header_button"
            onClick={() => {
              setShowMorePanel((e) => {
                return {
                  show: e.show == false ? true : e.panel != 1 ? true : false,
                  panel: 1,
                }
              })
            }}
            key={4}
            className={styles.account}
          >
            <img src={loginState.profile.avatar}></img>
          </div>
        )}
      </nav>
    </header>
  )
}
