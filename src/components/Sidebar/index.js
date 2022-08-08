import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <p>ftracker</p>
      </div>
      <div className={styles.sidebarProfile}>
        <img
          width={46}
          height={46}
          src="/img/sidebar/profile-photo.png"
          alt="profile"
        />
        <div>
          <p>Sierra Ferguson</p>
          <span>s.ferguson@gmail.com</span>
        </div>
      </div>
      <div className={styles.sidebarMenuItems}>
        <ul>
          <li className={styles.sidebarMenuItem}>
            <img
              width={24}
              height={24}
              src="/img/sidebar/dashboard.svg"
              alt="dashboard"
            />
            <span>Dashboard</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <img
              width={24}
              height={24}
              src="/img/sidebar/tasks.svg"
              alt="tasks"
            ></img>
            <span>Tasks</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <img
              width={24}
              height={24}
              src="/img/sidebar/email.svg"
              alt="tasks"
            ></img>
            <span>Email</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <img
              width={24}
              height={24}
              src="/img/sidebar/contacts.svg"
              alt="tasks"
            ></img>
            <span>Contacts</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <img
              width={24}
              height={24}
              src="/img/sidebar/chat.svg"
              alt="tasks"
            ></img>
            <span>Chat</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <img
              width={24}
              height={24}
              src="/img/sidebar/deals.svg"
              alt="tasks"
            ></img>
            <span>Deals</span>
          </li>
        </ul>
      </div>
      <div className={styles.extraMenuItems}>
        <ul>
          <li className={styles.sidebarMenuItem}>
            <img
              width={24}
              height={24}
              src="/img/sidebar/deals.svg"
              alt="tasks"
            ></img>
            Settings
          </li>
        </ul>
        <div>
          <img src="/img/sidebar/toggle.svg" alt="toggle"></img>
          <span>Toggle sidebar</span>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
