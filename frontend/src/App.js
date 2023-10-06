import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Web3Provider from "./web3/Web3Provider.js";

import "./index.css";

// Import Pages
import RootLayout from "./pages/Root.js";
import HomePage from "./pages/Home.js";
import MyAccount from "./pages/MyAccount.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "/myAccount", element: <MyAccount /> },
    ],
  },
]);

function App() {
  return (
    <Web3Provider>
      <RouterProvider router={router} />{" "}
    </Web3Provider>
  );
}

export default App;
