
import ButtonNotification from "./ButtonNotification";
import ButtonProfile from "./ButtonProfile";
import { InfoPanelProvider } from "./InfoPanelContext";
// import Notification from "./Notification";
// import Profile from "./Profile";

import styles from "./styles.module.scss";
import { InfoPanelContent } from "./InfoPanelContent";
import { Link } from "react-router-dom";

type Props = {};

const InfoPanel = (props: Props) => {

  return (
    <InfoPanelProvider>
      <Link to="/messages" key={6} className={styles.buttonItem}>
        <i className="fa-solid fa-comment-lines"></i>
      </Link>
      <ButtonNotification></ButtonNotification>
      <ButtonProfile></ButtonProfile>
      <InfoPanelContent></InfoPanelContent>
    </InfoPanelProvider>
  );
};

export default InfoPanel;
