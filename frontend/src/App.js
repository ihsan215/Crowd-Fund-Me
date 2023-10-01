import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Pages
import RootLayout from "./pages/Root.js";
import HomePage from "./pages/Home.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
