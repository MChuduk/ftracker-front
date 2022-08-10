import { useRef, useState } from "react";
import styles from "./Sidebar.module.scss";
import SidebarProfile from "./SidebarProfile";
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
      icon: <TasksIcon />,
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
    {
      text: "Settings",
      icon: <SettingsIcon />,
      extraStyle: styles.settingsMenuItem,
    },
    {
      text: "Toggle sidebar",
      icon: <ToggleIcon />,
      extraStyle: styles.toggleSidebarMenuItem,
      onClick: () => toggle(),
    },
  ];

  const [isOpen, setIsOpen] = useState(true);
  const menuItemRefs = useRef([]);

  const toggle = () => {
    setIsOpen(!isOpen);
    setMenuItemsVisibility();
  };

  const onAddRef = (element) => {
    if (!menuItemRefs.current.includes(element) && element) {
      menuItemRefs.current = [...menuItemRefs.current, element];
    }
  };

  const setMenuItemsVisibility = () => {
    setTimeout(() => {
      for (const item of menuItemRefs.current) {
        item.style.visibility = isOpen ? "collapse" : "visible";
      }
    }, 80);
  };

  return (
    <nav
      style={isOpen ? { width: "256px" } : { width: "72px" }}
      className={styles.sidebar}
    >
      <div className={styles.sidebarHeader}>
        <p>{isOpen ? "ftracker" : "ft"}</p>
      </div>
      <SidebarProfile
        name="Sierra Ferguson"
        email="s.ferguson@gmail.com"
        avatarUrl="/img/sidebar/profile-photo.png"
        onAddRef={onAddRef}
      />
      <div className={styles.sidebarMenuItems}>
        <ul>
          {menuItems.map((item, index) => (
            <SidebarMenuItem
              key={index}
              text={item.text}
              icon={item.icon}
              extraStyle={item.extraStyle}
              onClick={item.onClick}
              onAddRef={onAddRef}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
