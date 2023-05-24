import LayoutHeader from "@layouts/LayoutHeader";
import LayoutPage from "@layouts/LayoutPage";
import LayoutProfile from "@layouts/LayoutProfile";
import LayoutSocial from "@layouts/LayoutSocial";
import About from "@pages/about";
import CustomCV from "@pages/customcv";
import Home from "@pages/home";
import Interview from "@pages/interview";
import Mycv from "@pages/mycv";
import Page from "@pages/page";
import Profile from "@pages/profile";
import Register from "@pages/register";
import Social from "@pages/social";
import { createBrowserRouter } from "react-router-dom";
import App from "src/App";

export const routes = [
  {
    name: "app",
    path: "",
    element: <App></App>,
    children: [
      {
        path: "",
        name: "header",
        element: <LayoutHeader></LayoutHeader>,
        children: [
          {
            path: "/",
            name: "main",
            element: <Home></Home>,
            icon: "fa-regular fa-house-heart",
          },
          {
            path: "/profile",
            name: "profile-layout",
            element: <LayoutProfile></LayoutProfile>,
            children: [
              {
                path: "/profile/:id",
                name: "profile",
                element: <Profile></Profile>,
              },
              {
                path: "/profile/:id/mycv",
                name: "mycv",
                element: <Mycv></Mycv>,
              },
              {
                path: "/profile/:id/about",
                name: "about",
                element: <About></About>,
              },
            ],
          },
          {
            path: "/page",
            name: "page-layout",
            element: <LayoutPage></LayoutPage>,
            children: [
              {
                path: "/page/:id",
                name: "page",
                element: <Page></Page>,
              },
            ],
          },
          {
            path: "/social",
            name: "social-layout",
            element: <LayoutSocial></LayoutSocial>,
            children: [
              {
                path: "/social",
                name: "social",
                element: <Social></Social>,
              },
            ],
          },
          {
            path: "/interview/:id",
            name: "interview",
            element: <Interview></Interview>,
          },
        ],
      },
      {
        path: "/register",
        name: "register",
        element: <Register></Register>,
      },
      {
        path: "/customcv",
        name: "customcv",
        element: <CustomCV></CustomCV>,
      },
    ],
  },
];
export const router = createBrowserRouter(routes);
