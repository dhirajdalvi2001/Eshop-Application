import "./App.css";
import "./common/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Layout } from "./components/layout/Layout";
import Login from "./components/login/Login";
import { SignUp } from "./components/signup/SignUp";
import { AddProduct } from "./components/addProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/edit-product/:productId", element: <AddProduct /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
