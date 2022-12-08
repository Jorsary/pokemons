import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export { Layout };
