import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Web3Provider from "./web3/Web3Provider.js";
import UserProvider from "./user/UserProvider.js";
import { WagmiConfig } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import {
  wagmiConfig,
  WagmiWeb3ModalParameters,
} from "./web3/wagmi-parameters.js";

import "./index.css";

// Import Pages
import RootLayout from "./pages/Root.js";
import HomePage from "./pages/Home.js";
import MyAccount from "./pages/MyAccount.js";
import ContactUs from "./pages/Contact-Us.js";
import Projects from "./pages/Projects.js";
import Error from "./pages/Error.js";
import CreatedProjects from "./pages/CreateProject.js";

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
      {
        path: "/myAccount/:userId",
        element: <MyAccount />,
      },
      { path: "/contactUs", element: <ContactUs /> },
      { path: "/projects", element: <Projects /> },
      { path: "/:userId/createProject", element: <CreatedProjects /> },
    ],
  },
]);

createWeb3Modal(WagmiWeb3ModalParameters);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Web3Provider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </Web3Provider>
    </WagmiConfig>
  );
}

export default App;
