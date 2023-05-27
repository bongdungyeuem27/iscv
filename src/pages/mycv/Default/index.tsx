import { ISkill, useGetDefaultCvQuery } from "@graphql/generated/schema";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ICertificate } from "src/types/certificate";
import Avatar from "../Avatar";
import Certificate from "../Certificate";
import Contract from "../Contract";
import Education from "../Education";
import Group from "../Group";
import Skill from "../Skill";
import Social from "../Social";
import styles from "./styles.module.scss";

function Default() {
  const id = Number(useParams().id);
  const { loading, error, data, refetch, subscribeToMore, client } =
    useGetDefaultCvQuery({ variables: { employeeId: id } });

  const { t } = useTranslation("page", { keyPrefix: "mycv.index" });
  // data?.defaultCV?.iig
  if (!data) return null;
  return (
    <div className={styles.cv}>
      <div className={styles.left}>
        <div className={styles.top}>
          <div className={styles.promotion}>{t("cv_design_by_uit")}</div>
          <div className={styles.name}>{data.defaultCV?.name}</div>
          {/* <div className={styles.slogan}>
                <div className={styles.sloganItem}>
                  <div className={styles.arrowSlogun}></div>
                </div>
              </div> */}
        </div>

        <div className={styles.mainLeft}>
          {/* <Group></Group> */}
          <Group type="positive" title={t("education")}>
            <Education></Education>
          </Group>

          {data.defaultCV?.skills && (
            <Group type="positive" title={t("skills")}>
              <Skill list={(data.defaultCV?.skills as ISkill[]) || []}></Skill>
            </Group>
          )}

          <Group type="positive" title={t("certificates")}>
            <Certificate id={id} data={data.defaultCV?.certificate as ICertificate}></Certificate>
          </Group>
        </div>
      </div>

      <div className={styles.right}>
        {data.defaultCV?.sourceImage && (
          <Avatar id={id!} cid={data.defaultCV?.sourceImage}></Avatar>
        )}

        <div className={styles.rightInfo}>
          {data.defaultCV?.email && data.defaultCV?.phone && (
            <Group type="negative" title={t("contract")}>
              <Contract
                email={data.defaultCV?.email}
                phone={data.defaultCV?.phone}
              ></Contract>
            </Group>
          )}

          {data.defaultCV?.github && data.defaultCV?.linkedin && (
            <Group type="negative" title={t("social")}>
              <Social
                github={data.defaultCV?.github}
                linkedin={data.defaultCV?.linkedin}
              ></Social>
            </Group>
          )}

          {/* <Group type="negative"></Group>
              <Group type="negative"></Group> */}
        </div>
      </div>
    </div>
  );
}

export default Default;
