import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import NavBar from "./components/NaVBar";
import Modal from "react-modal";
import "./index.css";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <NavBar />
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
