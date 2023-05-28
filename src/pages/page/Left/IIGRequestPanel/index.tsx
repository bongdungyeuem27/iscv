import { postRequest } from "@apis/employee/iig";
import Input from "@components/Input";
import { useLoading } from "@components/Loading";
import { useGetIigRequestStatusQuery } from "@graphql/generated/schema";
import { useToast } from "@iscv/Toast";
import { Modal } from "@iscv/modal";
import { RootState } from "@redux/store";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EIIGRequest } from "src/types/certificate/iig";
import styles from "./styles.module.scss";

function Index() {
  const { t } = useTranslation("page", { keyPrefix: "posts.left.iig" });
  const params = useParams();
  const [openAdd, setOpenAdd] = useState(false);
  const toast = useToast();
  const loading = useLoading();
  const employee = useSelector((state: RootState) => state.auth.employee);
  const { data, refetch } = useGetIigRequestStatusQuery({
    variables: { employeeId: employee!.id },
  });
  const [certificateType, setCertificateType] = useState<
    EIIGRequest | undefined
  >();
  const [examId, setExamId] = useState<number | undefined>(undefined);

  const handleRequest = async () => {
    loading.open();
    await postRequest({
      employeeId: employee?.id!,
      examId: examId!,
      certificateType: certificateType!,
    })
      .then((success) => {
        refetch();
        toast.success();
      })
      .catch((error) => console.log(error));
    loading.close();
  };

  return (
    <>
      <Modal
        state={[openAdd, setOpenAdd]}
        title={t("request_certificate")}
        action={handleRequest}
      >

        <Input value={String(examId)} onChange={(e)=>setExamId(Number(e.target.value))}></Input>
      </Modal>
      <div className={styles.container}>
        <div className={styles.title}>
          <a>{t("request_certificate")}</a>
        </div>
        <div className={styles.content}>
          <button
            className={clsx(styles.item, {
              [styles.disabled]: data?.requestStatus?.lr,
            })}
            onClick={() => {
              if (data?.requestStatus?.lr) return;
              setCertificateType(EIIGRequest.LR);
              setOpenAdd(true);
            }}
          >
            <label>{t("certificate")} Listening & Reading</label>
            <i className="fa-solid fa-play"></i>
          </button>
          <button
            className={clsx(styles.item, {
              [styles.disabled]: data?.requestStatus?.sw,
            })}
            onClick={() => {
              if (data?.requestStatus?.sw) return;
              setCertificateType(EIIGRequest.SW);
              setOpenAdd(true);
            }}
          >
            <label>{t("certificate")} Speaking & Writing</label>
            <i className="fa-solid fa-play"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
