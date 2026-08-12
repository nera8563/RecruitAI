import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  return (
    <nav className="flex justify-between items-center py-6 px-8 max-sm:px-4">
      <Link to="/" className="font-bold text-4xl text-white">
        RecruitAI
      </Link>

      <button
        onClick={handleSignOut}
        className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
