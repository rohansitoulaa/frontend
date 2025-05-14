import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorRegistration from "./pages/author-registration/AuthorRegistration.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";
import Login from "./pages/login/Login.tsx";
import FAQs from "./pages/faqs/FAQs.tsx";
import HomePage from "./components/home/HomePage.tsx";
import Terms from "./pages/terms/Terms.tsx";
import Privacy from "./pages/privacy/Privacy.tsx";
import ChatBot from "./chat/ChatBot.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/chat" element={<ChatBot />} />
      </Route>
      <Route path="/authorRegistration" element={<AuthorRegistration />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
