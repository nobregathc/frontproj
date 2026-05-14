import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import { useTheme } from "../context/ThemeContext";
import "../css/Header.css";

function Header() {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

  return (
    <header className={`header ${dark ? "dark" : ""}`}>
      <h1 className="header-logo">Projeto Chat AI com React</h1>

      <div className="header-actions">
        <button onClick={() => navigate("/chat")}>Chat</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>

        <button onClick={toggleTheme}>
          {dark ? "Light/Dark" : "Light/Dark"}
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;