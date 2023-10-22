import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Web3Provider from "./web3/Web3Provider.js";
import Web3 from "web3";

import "./index.css";

// Import Pages
import RootLayout from "./pages/Root.js";
import HomePage from "./pages/Home.js";
import MyAccount from "./pages/MyAccount.js";
import ContactUs from "./pages/Contact-Us.js";
import Error from "./pages/Error.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "/myAccount", element: <MyAccount /> },
      { path: "/contactUs", element: <ContactUs /> },
    ],
  },
]);

const POLLING_INTERVAL = 1200;
const getLibrary = (provider) => {
  const library = new Web3(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Provider>
        <RouterProvider router={router} />{" "}
      </Web3Provider>
    </Web3ReactProvider>
  );
}

export default App;
