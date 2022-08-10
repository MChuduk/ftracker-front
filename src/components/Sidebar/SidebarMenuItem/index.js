import styles from "./SidebarMenuItem.module.scss";

function SidebarMenuItem({ text, icon, extraStyle, onClick, onAddRef }) {
  return (
    <li
      className={`${styles.sidebarMenuItem} ${extraStyle || ""}`}
      onClick={onClick}
    >
      {icon}
      <span ref={(el) => onAddRef(el)}>{text}</span>
    </li>
  );
}

export default SidebarMenuItem;
