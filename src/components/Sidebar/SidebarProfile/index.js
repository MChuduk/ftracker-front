import styles from "./SidebarProfile.module.scss";

function SidebarProfile({ name, email, avatarUrl, onAddRef }) {
  return (
    <div className={styles.sidebarProfile}>
      <img width={46} height={46} src={avatarUrl} alt={`avatar: ${name}`} />
      <div ref={(el) => onAddRef(el)}>
        <span className={styles.name}>{name}</span>
        <span className={styles.email}>{email}</span>
      </div>
    </div>
  );
}

export default SidebarProfile;
