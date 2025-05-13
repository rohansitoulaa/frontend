import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorRegistration from "./pages/author-registration/AuthorRegistration.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";
import Login from "./pages/login/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/authorRegistration" element={<AuthorRegistration />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
