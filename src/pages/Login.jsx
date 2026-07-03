import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/userService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {

      const response = await api.post("/auth/login", {
        email,
        password
      });

      const token = response.data.token;

      // Guardar el token para que Axios lo use
      localStorage.setItem("token", token);

      // Obtener el usuario autenticado
      const user = await getCurrentUser();

      // Guardar token y usuario en el contexto
      login(token, user);

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}