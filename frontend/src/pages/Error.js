import React from "react";
import { Link } from "react-router-dom";

// import components
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";

import "../style/Error.css";

function Error() {
  return (
    <React.Fragment>
      <MainNavigation />

      <main>
        <div className="error-page">
          <h1>
            Page not found ! Please return the <Link to="/">main page.</Link>
          </h1>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default Error;
