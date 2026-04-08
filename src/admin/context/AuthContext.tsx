import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Mock auth context — to be replaced with Supabase auth once the project is set up.
 * Persists a fake "session" in localStorage so refresh keeps you logged in.
 */

interface AdminUser {
  email: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "ht_admin_mock_session";

// TEMP — anything works while we mock. We'll wire to Supabase next.
const MOCK_EMAIL = "admin@harvardandtaylor.com";
const MOCK_PASSWORD = "admin123";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // simulate network latency
    await new Promise((r) => setTimeout(r, 500));

    if (email.trim().toLowerCase() !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
      return { error: "Invalid email or password." };
    }
    const next = { email: email.trim().toLowerCase() };
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return { error: null };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
