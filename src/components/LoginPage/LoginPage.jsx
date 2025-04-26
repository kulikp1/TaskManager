import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./LoginPage.module.css";
import Logo from "../../assets/logo.png";

const LoginPage = () => {
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
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={styles.input}
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
                <Field
                  name="password"
                  type="password"
                  className={styles.input}
                  placeholder="Введіть пароль"
                />
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
                Увійти
                <span className={styles.buttonIcon}>➔</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
