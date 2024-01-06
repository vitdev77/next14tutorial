"use client";

import styles from "./adminUserForm.module.css";

import { useFormState } from "react-dom";
import { addUser } from "@/lib/actions";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h2>Add User</h2>
      <input type="text" name="username" placeholder="Username" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="text" name="img" placeholder="Image" />
      <select name="isAdmin">
        <option value="false">User</option>
        <option value="true">Admin</option>
      </select>
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminUserForm;
