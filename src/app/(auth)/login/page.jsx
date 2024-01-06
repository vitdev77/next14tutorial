import styles from "./login.module.css";

import LoginForm from "@/components/loginForm/loginForm";

const LoginPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
