import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./page/Home/HomePage";
import { Layout } from "./template/Layout";
import React from "react";
import { InfoImage } from "./page/InfoImage/InfoImage";

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path='/info-img/:id'
            element={
              <Layout>
                <InfoImage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
