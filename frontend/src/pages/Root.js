import React from "react";
import { Outlet } from "react-router-dom";

// import components
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <React.Fragment>
      <MainNavigation />

      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default RootLayout;
