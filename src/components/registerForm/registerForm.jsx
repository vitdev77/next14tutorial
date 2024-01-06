"use client";

import styles from "./registerForm.module.css";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      <button>Register</button>
      {state?.error}
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
