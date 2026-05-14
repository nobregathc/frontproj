import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import LogButton from "./LogButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login bem sucedido!");
      navigate("/chat");
    } catch (err) {
      setError("Email ou password incorretos.");
      console.error(err);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registro bem sucedido!");
      navigate("/chat");
    } catch (err: any) {
      setError(err.message || "Erro no registro.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login Projeto Chat IA</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <LogButton onClick={handleLogin} label="Entrar" />
        <LogButton onClick={handleRegister} label="Registrar" />
      </div>
    </div>
  );
}

export default LoginForm;