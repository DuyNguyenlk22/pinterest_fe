import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./page/Home/HomePage";
import { Layout } from "./template/Layout";
import React from "react";
import { InfoImage } from "./page/InfoImage/InfoImage";
import { Login } from "./page/Login/Login";
import { Register } from "./page/Register/Register";
import { CreateImg } from "./page/CreateImg/CreateImg";
import { InfoUser } from "./page/InfoUser/InfoUser";

let data = [
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/info-img/:id",
    element: (
      <Layout>
        <InfoImage />
      </Layout>
    ),
  },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  {
    path: "/createImg",
    element: (
      <Layout>
        <CreateImg />
      </Layout>
    ),
  },
  {
    path: "/personal",
    element: (
      <Layout>
        <InfoUser />
      </Layout>
    ),
  },
];

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {data.map((item, index) => {
            return <Route key={index} path={item.path} element={item.element} />;
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};
