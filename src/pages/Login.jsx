import { useState } from "react";
import { loginRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
        setError("");
        const { token } = await loginRequest(
            email,
            password
        );
        await login(token);
        navigate("/dashboard");
    } catch (err) {
        console.error(err);
        setError(
            err.response?.data?.message ??
            "No fue posible iniciar sesión."
        );
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
      {
        error && (
          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )
      }
    </div>
  );
}