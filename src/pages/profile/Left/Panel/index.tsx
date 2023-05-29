import clsx from "clsx";
import styles from "./styles.module.scss";

import { useTranslation } from "react-i18next";

type Props = {
  type: string;
  children: React.ReactNode;
  className?: string;
};

function Index(props: Props) {
  const { type, children, className } = props;

  const { t } = useTranslation("page", { keyPrefix: "posts.left.skills" });

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.title}>
        <a>{t(type)}</a>
      </div>
      {children}
    </div>
  );
}

export default Index;
