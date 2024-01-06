"use client";

import styles from "./adminPostForm.module.css";

import { useFormState } from "react-dom";
import { addPost } from "@/lib/actions";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h2>Add Post</h2>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="img" placeholder="Image" />
      <textarea type="text" name="desc" placeholder="Description" rows={10} />
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminPostForm;
