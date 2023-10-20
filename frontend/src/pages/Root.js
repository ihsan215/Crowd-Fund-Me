import React from "react";
import { Outlet } from "react-router-dom";

// import components
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <React.Fragment>
      <MainNavigation />

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default RootLayout;
