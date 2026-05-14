import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import Dashboard from "./components/Dashboard";
import "./css/App.css";

function App() {
  const { dark } = useTheme();

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
