import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InfoSettings } from "./page/InfoSettings/InfoSettings";
import { InfoImage } from "./page/InfoImage/InfoImage";
import { CreateImg } from "./page/CreateImg/CreateImg";
import { Register } from "./page/Register/Register";
import { InfoUser } from "./page/InfoUser/InfoUser";
import HomePage from "./page/Home/HomePage";
import { Layout } from "./template/Layout";
import { Login } from "./page/Login/Login";
import React from "react";
import "./App.scss";

interface dataProps {
  path: string;
  element: React.ReactNode;
}

export const App: React.FC = () => {
  const data: dataProps[] = [
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
    {
      path: "/settings",
      element: (
        <Layout>
          <InfoSettings />
        </Layout>
      ),
    },
  ];
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
