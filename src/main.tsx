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
import AuthorProfile from "./pages/authorprofile/AuthorProfile.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import { Navigate } from "react-router-dom";
import Unauthorized from "./pages/unauthorized/Unauthorized.tsx";
import Aboutus from "./pages/aboutus/Aboutus.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/profile" element={<AuthorProfile />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Route>
      <Route path="/authorRegistration" element={<AuthorRegistration />} />
      <Route path="terms" element={<Terms />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* <Route path="/user" element={<User />} /> */}
    </Routes>
  </BrowserRouter>
);
