import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/profile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    const result = await signIn(email, password);
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }
    const role = String(result.user?.role || "user").toLowerCase();
    const nextPath = role === "admin" ? "/admin/dashboard" : from;
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back. Sign in to manage your profile and reservations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="signin-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label
              htmlFor="signin-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              autoComplete="current-password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-orange-500 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
