import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./common/styles/global.css";
import Product from "./components/Product/Product";
import { AddProduct } from "./components/addProduct/AddProduct";
import { Home } from "./components/home/Home";
import { Layout } from "./components/layout/Layout";
import Login from "./components/login/Login";
import { SignUp } from "./components/signup/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/edit-product/:productId", element: <AddProduct /> },
      { path: "/product/:productId", element: <Product /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> }
    ]
  },
  {
    path: "about",
    element: <div>About</div>
  }
]);
