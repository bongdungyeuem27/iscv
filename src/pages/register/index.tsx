import { useQuery } from "@apollo/client";
import avatarDefault from "@assets/avatar.png";
import { useToast } from "@iscv/toast";
import { Toggle } from "@components/Toggle";
import { emailRegExp, phoneRegExp } from "@helpers/regex";
import { RootState } from "@redux/store";
import clsx from "clsx";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { FormikData, Professional } from "./types";
import { useRegister } from "./useRegister";
import { useGetEmployeeByUserQuery } from "@graphql/generated/schema";

function Index() {
  const signer = useSelector((state: RootState) => state.auth.signer);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [employeeOrBusiness, setEmployeeOrBusiness] = useState(false);
  const toast = useToast();
  const account = useSelector((state: RootState) => state.auth.account);
  const { loading, error, data, refetch, subscribeToMore, client } =
    useGetEmployeeByUserQuery({ variables: { user: account! } });

  const navigate = useNavigate();
  const { t } = useTranslation("page", { keyPrefix: "register.index" });
  const formik = useFormik<FormikData>({
    initialValues: {
      avatar: undefined,
      fullname: "",
      phone: "",
      professional: Professional.ANOTHER,
      email: "",
      github: "",
      linkedin: "",
    },
    validationSchema: Yup.object({
      avatar: Yup.mixed()
        .required(t("require"))
        .test(
          "type",
          "Only the following formats are accepted: .jpeg, .jpg, .jpg",
          (value) => {
            return (
              value &&
              (value.type === "image/jpeg" ||
                value.type === "image/jpg" ||
                value.type === "image/png")
            );
          }
        ),
      fullname: Yup.string().required(t("require")),
      phone: Yup.string()
        .required(t("require"))
        .matches(phoneRegExp, t("invalid")),
      professional: Yup.string().required(t("require")),
      email: Yup.string()
        .email(t("invalid"))
        .required(t("require"))
        .matches(emailRegExp, t("invalid")),
      github: Yup.string(),
      linkedin: Yup.string(),
    }),
    onSubmit: async (values) => {
      useRegister(values, signer!, toast, navigate, refetch);
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.languageWrapper}>
        <div className={styles.language}>{/* <Language></Language> */}</div>
      </div>
      <div className={styles.loginTitle}>{t("register_your_account")}</div>
      <img
        width={150}
        height={150}
        src={
          formik?.values.avatar
            ? URL.createObjectURL(formik.values.avatar)
            : avatarDefault
        }
        className={styles.avatarImg}
        alt="avatar"
      ></img>
      <div className={clsx(styles.boxWrapper, styles.avatarBox)}>
        <input
          type="file"
          name="avatar"
          ref={avatarRef}
          className={styles.input}
          accept="image/png, image/jpg, image/jpeg"
          style={{ display: "none" }}
          onChange={(e) =>
            formik?.setFieldValue("avatar", e?.target?.files?.item(0))
          }
        ></input>
        <div className={styles.iconAvatar}>
          <i
            onClick={() => avatarRef?.current?.click()}
            className="fa-solid fa-camera"
          ></i>
        </div>
      </div>

      <p className={styles.error}>{formik?.errors.avatar?.toString()}</p>
      <form className={styles.main} onSubmit={formik?.handleSubmit}>
        <div className={clsx(styles.boxWrapper, styles.address)}>
          <label className={styles.label}>{t("address")}</label>
          <p className={styles.input}>{signer?._address}</p>
        </div>
        <div className={styles.mainInput}>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t("name")}</label>
            <input
              type="text"
              name="fullname"
              className={styles.input}
              value={formik?.values.fullname}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>
              {formik?.errors.fullname?.toString()}
            </p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t("phone")}</label>
            <input
              type="phone"
              name="phone"
              className={styles.input}
              value={formik?.values.phone}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.phone?.toString()}</p>
          </div>

          <div className={styles.boxWrapper}>
            <label className={styles.label}>{"professional"}</label>
            <select
              // type="text"
              name="professional"
              className={styles.input}
              value={formik?.values.professional}
              onChange={formik?.handleChange}
            >
              <option value="student">Student</option>
              <option value="fresher">Fresher</option>
              <option value="intern">Intern</option>
              <option value="another">Another</option>
            </select>
            <p className={styles.error}>
              {formik?.errors.professional?.toString()}
            </p>
          </div>

          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t("email")}</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              value={formik?.values.email}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.email?.toString()}</p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t("github")}</label>
            <input
              type="text"
              name="github"
              className={styles.input}
              value={formik?.values.github}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.github?.toString()}</p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t("linkedin")}</label>
            <input
              type="text"
              name="linkedin"
              className={styles.input}
              value={formik?.values.linkedin}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.linkedin}</p>
          </div>
        </div>
        <div className={styles.boxWrapper}>
          <input
            type="submit"
            className={styles.button}
            value={t("register")}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Index;
