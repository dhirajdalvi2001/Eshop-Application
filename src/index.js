import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer
      closeOnClick
      limit={1}
      hideProgressBar={false}
      autoClose={2000}
      theme="colored"
    />
    <RouterProvider router={router} />
  </>
);
