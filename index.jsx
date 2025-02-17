import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import App from "./App";
import Home from "./Component/Home";
import Error from "./Component/Error";
import CountryDetailscopy from "./Component/CountryDetailscopy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:Country",
        element: <CountryDetailscopy />,
      },
    ],
  },
]);
const root = createRoot(document.querySelector("#root"));

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
