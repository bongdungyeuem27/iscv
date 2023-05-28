import logo from "@assets/LogoCV.png";
import clsx from "clsx";

import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import InfoPanel from "./InfoPanel";
import { list } from "./list";
import styles from "./styles.module.scss";
import SearchBox from "./SearchBox";

type Props = {};

export default function Header(props: Props) {
  const { t, i18n } = useTranslation("component", {
    keyPrefix: "header.index",
  });
  return (
    <header id="header" className={styles.container}>
      <div className={styles.toggleNavigation}></div>
      {/* <div className={styles.navMobile}>
        <div className={styles.textModileTitle}>navigation</div>
        <ul>
          {list.map((value, index) => {
            return (
              <Link key={index} to={value.to}>
                <div className={styles.icon}>
                  <i className={value.icon}></i>
                </div>
                <div className={styles.name}>
                  {Object(translation)[value.name]}
                </div>
              </Link>
            );
          })}
        </ul>
      </div> */}
      <div className={styles.navLeft}>
        <NavLink key="header_icon" to="/">
          <img className={styles.logo} alt="logo" src={logo}></img>
        </NavLink>
        <SearchBox></SearchBox>
      </div>
      <nav id="navbar" className={clsx(styles.navCenter)}>
        <ul>
          {list.map((value, index) => {
            return (
              <Link
                key={index}
                to={value.to}
                className={clsx(styles.navItem)}
                // prefetch={false}
              >
                <i className={value.icon}></i>
                <div className={styles.name}>{t(value.name)}</div>
              </Link>
            );
          })}
        </ul>
      </nav>
      <nav id="navbar" className={clsx(styles.navRight)}>
        <InfoPanel></InfoPanel>
      </nav>
    </header>
  );
}
