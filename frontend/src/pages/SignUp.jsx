import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";
import InputBox from "../components/InputBox";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      const result = await signUp(form.name, form.email, form.password);

      if (!result?.success) {
        toast.error(result?.message || "Failed to create account");
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      navigate("/sign-in");
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    onClick();
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center px-6 sm:px-4 font-inter">
      <div className="w-full max-w-lg bg-[#1c1c1f] rounded-3xl shadow-xl p-10 sm:p-8 border border-[#2a2a2e]">
        <h1 className="text-4xl font-bold mb-3 text-center text-white tracking-tight">
          RecruitAI
        </h1>
        <p className="text-base text-center text-gray-400 mb-8 leading-relaxed">
          Practice real-world interviews. Improve your confidence and skills.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputBox
            label="Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputBox
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <InputBox
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-200"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </button>
          </div>

          <InputBox
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center cursor-pointer ${
              isLoading ? "bg-blue-100 cursor-not-allowed" : "bg-blue-200 hover:bg-blue-300"
            } text-black transition-colors py-3 rounded-full text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-white font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
