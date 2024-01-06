import styles from "./adminUsers.module.css";

import Image from "next/image";
import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/actions";

const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.userDetail}>
            <Image
              src={user.img || "/noUser.svg"}
              alt={user.username}
              width={48}
              height={48}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.username}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
          {!user.isAdmin ? (
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <button className={styles.userButton}>Delete</button>
            </form>
          ) : (
            <button className={styles.userButtonDisabled} disabled>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
