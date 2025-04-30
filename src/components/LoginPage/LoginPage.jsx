import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./LoginPage.module.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.message || "Помилка входу");
              }

              // Збереження токена (і при бажанні імені)
              localStorage.setItem("token", data.token);
              localStorage.setItem("username", data.user.username);

              // Перехід на захищену сторінку
              navigate("/home");
            } catch (err) {
              setErrors({ password: err.message });
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

              <div className={styles.buttonsWrapper}>
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className={styles.loader}></div>
                  ) : (
                    <>Увійти ➔</>
                  )}
                </button>

                <button
                  type="button"
                  className={`${styles.loginButton} ${styles.secondaryButton}`}
                  onClick={() => navigate("/register")}
                >
                  Створити акаунт ✚
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
