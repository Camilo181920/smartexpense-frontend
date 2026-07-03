import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

            {/* Logo */}
            <h1 className="font-bold text-xl text-blue-600">
                SmartExpense
            </h1>

            {/* User section */}
            <div className="flex items-center gap-4">

                {user ? (
                    <div className="text-right leading-tight">
                        <p className="font-semibold text-gray-800">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {user.email}
                        </p>
                    </div>
                ) : (
                    <span className="text-gray-500">
                        Usuario
                    </span>
                )}

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}