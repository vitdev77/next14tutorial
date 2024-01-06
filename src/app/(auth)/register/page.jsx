import styles from "./register.module.css";

import RegisterForm from "@/components/registerForm/registerForm";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
