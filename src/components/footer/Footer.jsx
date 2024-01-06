import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Company.</div>
      <div className={styles.text}>
        Creative Thoughts Agency &copy; All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
