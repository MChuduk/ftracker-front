import styles from "./Layout.module.scss";
import { Link, Outlet } from "react-router-dom";
import { AccentHeader } from "../AccentHeader";

const Layout = () => {
  return (
    <>
      <AccentHeader />
      <Outlet />
    </>
  );
};

export { Layout };
