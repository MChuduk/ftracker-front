import { useState } from "react";
import styles from "./Sidebar.module.scss";
import SidebarMenuItem from "./SidebarMenuItem";
import DashboardIcon from "./SidebarIcons/DashboardIcon";
import TasksIcon from "./SidebarIcons/TasksIcon";
import EmailIcon from "./SidebarIcons/EmailIcon";
import ContactsIcon from "./SidebarIcons/ContactsIcon";
import ChatIcon from "./SidebarIcons/ChatIcon";
import DealsIcon from "./SidebarIcons/DealsIcon";
import SettingsIcon from "./SidebarIcons/SettingsIcon";
import ToggleIcon from "./SidebarIcons/ToggleIcon";

function Sidebar() {
  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      text: "Tasks",
      icon: <ChatIcon />,
    },
    {
      text: "Email",
      icon: <EmailIcon />,
    },
    {
      text: "Contacts",
      icon: <ContactsIcon />,
    },
    {
      text: "Chat",
      icon: <ChatIcon />,
    },
    {
      text: "Deals",
      icon: <DealsIcon />,
    },
  ];

  const extraMenuItems = [
    {
      text: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  const menuItemRefs = [];

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
    setMenuItemsVisibility();
  };

  const addMenuItemRef = (ref) => {
    menuItemRefs.current = [...menuItemRefs.current, ref];
  };

  const setMenuItemsVisibility = () => {
    setTimeout(() => {
      const items = [...menuItems, ...extraMenuItems];
      console.log(items);
      for (const item of items) {
        const [span] = item.current.getElementsByTagName("span");
        span.style.visibility = isOpen ? "collapse" : "visible";
      }
    }, 80);
  };

  return (
    <nav
      style={isOpen ? { width: "256px" } : { width: "72px" }}
      className={styles.sidebar}
    >
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
          {menuItems.map((item, index) => (
            <SidebarMenuItem
              key={index}
              text={item.text}
              icon={item.icon}
              addRef={addMenuItemRef}
            />
          ))}
        </ul>
      </div>
      <div className={styles.extraMenuItems}>
        <ul>
          {extraMenuItems.map((item, index) => (
            <SidebarMenuItem
              key={index}
              text={item.text}
              icon={item.icon}
              addRef={addMenuItemRef}
            />
          ))}
        </ul>
        <SidebarMenuItem
          text="Toggle sidebar"
          onClick={() => toggle()}
          icon={<ToggleIcon />}
          addRef={addMenuItemRef}
        />
      </div>
    </nav>
  );
}

export default Sidebar;
