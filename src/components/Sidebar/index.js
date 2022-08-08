import React from "react";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isTransitionEnd, setIsTransitionEnd] = React.useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    setIsTransitionEnd(false);
  }

  return (
    <nav
      style={isOpen ? { width: "256px" } : { width: "68px" }}
      className={styles.sidebar}
      onTransitionEnd={() => setIsTransitionEnd(true)}
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
          <li className={styles.sidebarMenuItem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.16667 8.13333H1.5C1.33431 8.13333 1.2 7.99902 1.2 7.83333V1.5C1.2 1.33431 1.33431 1.2 1.5 1.2H6.16667C6.33235 1.2 6.46667 1.33431 6.46667 1.5V7.83333C6.46667 7.99902 6.33235 8.13333 6.16667 8.13333ZM6.16667 14.8H1.5C1.33431 14.8 1.2 14.6657 1.2 14.5V11.5C1.2 11.3343 1.33431 11.2 1.5 11.2H6.16667C6.33235 11.2 6.46667 11.3343 6.46667 11.5V14.5C6.46667 14.6657 6.33235 14.8 6.16667 14.8ZM14.5 14.8H9.83333C9.66765 14.8 9.53333 14.6657 9.53333 14.5V8.16667C9.53333 8.00098 9.66765 7.86667 9.83333 7.86667H14.5C14.6657 7.86667 14.8 8.00098 14.8 8.16667V14.5C14.8 14.6657 14.6657 14.8 14.5 14.8ZM9.53333 4.5V1.5C9.53333 1.33431 9.66765 1.2 9.83333 1.2H14.5C14.6657 1.2 14.8 1.33431 14.8 1.5V4.5C14.8 4.66569 14.6657 4.8 14.5 4.8H9.83333C9.66765 4.8 9.53333 4.66569 9.53333 4.5Z"
                stroke="#C2CFE0"
                strokeWidth="1.4"
              />
            </svg>
            <span>Dashboard</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3.7H20C20.1634 3.7 20.3 3.8366 20.3 4V10C20.3 10.1634 20.1634 10.3 20 10.3H3C2.8366 10.3 2.7 10.1634 2.7 10V4C2.7 3.8366 2.8366 3.7 3 3.7ZM3 13.7H20C20.1634 13.7 20.3 13.8366 20.3 14V20C20.3 20.1634 20.1634 20.3 20 20.3H3C2.8366 20.3 2.7 20.1634 2.7 20V14C2.7 13.8366 2.8366 13.7 3 13.7Z"
                stroke="#C2CFE0"
                strokeWidth="1.4"
              />
            </svg>
            <span>Tasks</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.71 6.00058V6C2.71 5.28202 3.29116 4.7 4 4.7H20C20.7134 4.7 21.3 5.2866 21.3 6V18C21.3 18.7134 20.7134 19.3 20 19.3H4C3.28669 19.3 2.70015 18.7135 2.7 18.0003C2.7 18.0002 2.7 18.0001 2.7 18L2.71 6.00058Z"
                stroke="#C2CFE0"
                strokeWidth="1.4"
              />
              <path d="M3 6L12 12L21 6" stroke="#C2CFE0" strokeWidth="1.4" />
            </svg>
            <span>Email</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.03329 7.33317C8.03329 5.14144 9.80822 3.3665 12 3.3665C14.1917 3.3665 15.9666 5.14144 15.9666 7.33317C15.9666 9.52491 14.1917 11.2998 12 11.2998C9.80822 11.2998 8.03329 9.52491 8.03329 7.33317ZM3.36663 17.8332C3.36663 17.3144 3.62092 16.8083 4.16167 16.3092C4.70718 15.8057 5.49622 15.3581 6.42548 14.9859C8.28512 14.2409 10.53 13.8665 12 13.8665C13.47 13.8665 15.7148 14.2409 17.5744 14.9859C18.5037 15.3581 19.2927 15.8057 19.8382 16.3092C20.379 16.8083 20.6333 17.3144 20.6333 17.8332V20.6332H3.36663V17.8332Z"
                stroke="#C2CFE0"
                strokeWidth="1.4"
              />
            </svg>
            <span>Contacts</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 17.3H5.71005L5.50503 17.505L2.7 20.3101V4C2.7 3.2866 3.2866 2.7 4 2.7H20C20.7134 2.7 21.3 3.2866 21.3 4V16C21.3 16.7134 20.7134 17.3 20 17.3H6Z"
                stroke="#C2CFE0"
                strokeWidth="1.4"
              />
            </svg>
            <span>Chat</span>
          </li>
          <li className={styles.sidebarMenuItem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.7H21C21.1634 4.7 21.3 4.8366 21.3 5V19C21.3 19.1634 21.1634 19.3 21 19.3H3C2.8366 19.3 2.7 19.1634 2.7 19V5C2.7 4.8366 2.8366 4.7 3 4.7Z"
                stroke="#C2CFE0"
                strokeWidth="1.4"
              />
              <rect x="7.80005" y="4" width="1.4" height="16" fill="#C2CFE0" />
              <rect x="14.8" y="4" width="1.4" height="16" fill="#C2CFE0" />
            </svg>
            <span>Deals</span>
          </li>
        </ul>
      </div>
      <div className={styles.extraMenuItems}>
        <ul>
          <li className={styles.sidebarMenuItem}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                fill="#C2CFE0"
              />
            </svg>
            <span>Settings</span>
          </li>
        </ul>
        <div className={styles.sidebarMenuItem} onClick={toggle}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 0C0.895431 0 0 0.89543 0 2V12C0 13.1046 0.89543 14 2 14H12C13.1046 14 14 13.1046 14 12V2C14 0.895431 13.1046 0 12 0H2ZM5 2C4.44772 2 4 2.44772 4 3V11C4 11.5523 4.44772 12 5 12C5.55228 12 6 11.5523 6 11V3C6 2.44772 5.55228 2 5 2Z"
              fill="#C2CFE0"
            />
          </svg>
          <span>Toggle sidebar</span>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
