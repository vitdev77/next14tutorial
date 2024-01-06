"use client";

import styles from "./loginForm.module.css";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { handleGithubLogin, login } from "@/lib/actions";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  const router = useRouter();

  //   useEffect(() => {
  //     state?.success && router.push("/");
  //   }, [state?.success, router]);
  return (
    <>
      <form action={handleGithubLogin} className={styles.form}>
        <button className={styles.loginWith}>
          <FaGithub size={32} /> Login with GitHub
        </button>
      </form>
      <form action={formAction} className={styles.form}>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login with Credentials</button>
        {state?.error}
        <p>
          {"Don't have an account yet?"} <Link href="/register">Register</Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
