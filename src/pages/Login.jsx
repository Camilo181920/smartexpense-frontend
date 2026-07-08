import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/userService";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();



  const handleLogin = async (event) => {

    event.preventDefault();

    setError("");


    if (!email.trim() || !password.trim()) {

      setError("Email y contraseña son obligatorios.");
      return;

    }


    try {

      setLoading(true);

      localStorage.removeItem("token");


      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });


      const token = response.data.token;


      localStorage.setItem("token", token);


      const user = await getCurrentUser();


      await login(token, user);


      navigate("/dashboard");


    } catch (err) {

      console.error(err);


      if (err.response?.data?.message) {

        setError(err.response.data.message);

      } else {

        setError("No fue posible iniciar sesión.");

      }


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">


      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >


        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          SmartExpense
        </h1>


        {error && (

          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>

        )}



        <div className="mb-4">

          <label className="mb-1 block text-sm font-medium text-slate-600">
            Email
          </label>


          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@email.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

        </div>



        <div className="mb-6">

          <label className="mb-1 block text-sm font-medium text-slate-600">
            Contraseña
          </label>


          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

        </div>



        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >

          {loading ? "Ingresando..." : "Iniciar sesión"}

        </button>


      </form>


    </div>

  );
}