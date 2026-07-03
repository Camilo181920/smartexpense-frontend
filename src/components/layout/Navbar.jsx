import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500 capitalize">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="text-right">

          <p className="font-semibold text-slate-800">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.firstName?.charAt(0)}
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </header>
  );
}