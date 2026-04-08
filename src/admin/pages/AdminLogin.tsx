import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LocationState {
  from?: { pathname: string };
}

const AdminLogin = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    const from = (location.state as LocationState)?.from?.pathname ?? "/admin";
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error } = await signIn(email, password);

    setSubmitting(false);

    if (error) {
      setError(error);
      return;
    }

    const from = (location.state as LocationState)?.from?.pathname ?? "/admin";
    navigate(from, { replace: true });
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cream px-5 py-12"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <p
              className="text-gold text-[28px] leading-tight"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Harvard &amp; Taylor
            </p>
          </Link>
          <p
            className="text-tan text-[10px] tracking-[0.3em] uppercase mt-2"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-tan/20 rounded-lg shadow-sm px-8 py-10">
          <h1
            className="text-coffeeBrown text-[22px] mb-2 text-center"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Sign in
          </h1>
          <p
            className="text-dark/50 text-[13px] text-center mb-8"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Enter your credentials to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] tracking-[0.2em] uppercase text-tan mb-2"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@harvardandtaylor.com"
                className="w-full px-4 py-3 bg-cream/50 border border-tan/30 rounded-md text-[14px] text-coffeeBrown placeholder:text-tan/50 focus:outline-none focus:border-gold focus:bg-white transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] tracking-[0.2em] uppercase text-tan mb-2"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-cream/50 border border-tan/30 rounded-md text-[14px] text-coffeeBrown placeholder:text-tan/50 focus:outline-none focus:border-gold focus:bg-white transition-colors"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-md"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.2em] uppercase font-light bg-camel text-cream-light hover:bg-gold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Mock notice — remove once Supabase is wired */}
          <div className="mt-8 pt-6 border-t border-tan/20">
            <p
              className="text-[10px] text-tan/80 text-center leading-relaxed"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              MOCK MODE — use{" "}
              <span className="text-coffeeBrown">admin@harvardandtaylor.com</span>
              {" / "}
              <span className="text-coffeeBrown">admin123</span>
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-[11px] tracking-[0.2em] uppercase text-tan hover:text-gold transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
