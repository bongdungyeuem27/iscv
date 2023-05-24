import { ProgressBar } from "@components/ProgressBar";
import styles from "./styles.module.scss";
import { ISkill } from "@graphql/generated/schema";

function Index({ list }: { list: ISkill[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        {list.map((value, index) => {
          return (
            <div key={index} className={styles.item}>
              <div className={styles.itemTitle}>
                <div className={styles.title}>{value.title}</div>
                <div className={styles.level}>{value.level}%</div>
              </div>
              <ProgressBar percent={Math.round(value.level!)}></ProgressBar>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Index;
