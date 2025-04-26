import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./LoginPage.module.css";
import Logo from "../../assets/logo.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.block} ${styles.leftBlock}`}>
        <div className={styles.logo}>
          <img src={Logo} alt="TaskManager Logo" className={styles.logoImage} />
        </div>
        <div className={styles.slogan}>Почнімо продуктивність!</div>
      </div>

      <div className={`${styles.block} ${styles.rightBlock}`}>
        <h1 className={styles.title}>Увійдіть у свій акаунт</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Невірна електронна адреса")
              .required("Обов'язкове поле"),
            password: Yup.string()
              .min(6, "Пароль має містити щонайменше 6 символів")
              .required("Обов'язкове поле"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              setSubmitting(false); // імітація запиту
            }, 2000);
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
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className={styles.loader}></div>
                ) : (
                  <>
                    Увійти
                    <span className={styles.buttonIcon}>➔</span>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        <button className={`${styles.loginButton} ${styles.secondaryButton}`}>
          Створити акаунт
          <span className={styles.buttonIcon}>✚</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
