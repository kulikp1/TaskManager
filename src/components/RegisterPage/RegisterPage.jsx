import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./RegisterPage.module.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import API from "../../api/api"; // 👈 імпорт axios-інстансу

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={`${styles.block} ${styles.leftBlock}`}>
        <div className={styles.logo}>
          <img src={Logo} alt="TaskManager Logo" className={styles.logoImage} />
        </div>
        <div className={styles.slogan}>Приєднуйтесь до нашої спільноти!</div>
      </div>

      <div className={`${styles.block} ${styles.rightBlock}`}>
        <h1 className={styles.title}>Створіть акаунт</h1>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Невірна електронна адреса")
              .required("Обов'язкове поле"),
            password: Yup.string()
              .min(6, "Пароль має містити щонайменше 6 символів")
              .required("Обов'язкове поле"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Паролі повинні співпадати")
              .required("Обов'язкове поле"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await API.post("/auth/register", {
                email: values.email,
                password: values.password,
              });

              const data = response.data;

              localStorage.setItem("token", data.token);
              navigate("/dashboard");
            } catch (err) {
              const message =
                err.response?.data?.message || "Сталася помилка при реєстрації";
              setErrors({ email: message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={`${styles.input} ${
                    errors.email && touched.email ? styles.inputError : ""
                  }`}
                  placeholder="Введіть email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Пароль</label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`${styles.input} ${
                      errors.password && touched.password
                        ? styles.inputError
                        : ""
                    }`}
                    placeholder="Введіть пароль"
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff size={22} />
                    ) : (
                      <FiEye size={22} />
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Підтвердити пароль</label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`${styles.input} ${
                      errors.confirmPassword && touched.confirmPassword
                        ? styles.inputError
                        : ""
                    }`}
                    placeholder="Підтвердіть пароль"
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={22} />
                    ) : (
                      <FiEye size={22} />
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.buttonsWrapper}>
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className={styles.loader}></div>
                  ) : (
                    <>Зареєструватися ✚</>
                  )}
                </button>

                <button
                  type="button"
                  className={`${styles.loginButton} ${styles.secondaryButton}`}
                  onClick={() => navigate("/login")}
                >
                  Уже маєте акаунт? ➔
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
