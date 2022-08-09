import styles from "./SidebarMenuItem.module.scss";

function SidebarMenuItem({ text, icon, onClick, addRef }) {
  return (
    <li className={styles.sidebarMenuItem} onClick={onClick}>
      {icon}
      <span>{text}</span>
    </li>
  );
}

export default SidebarMenuItem;
