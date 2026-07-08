import { useState } from "react";
import { useNavigate } from "react-router";
import { useAdminLogin } from "../../hooks/useAdminLogin";
import style from "./AdminLoginPage.module.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const { login, loading, errorMsg } = useAdminLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/admin");
    }
  }

  return (
    <main className={style.login_page}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>

        {errorMsg && (
          <p className="error">
            {errorMsg}
          </p>
        )}

        <div className={style.email_container}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="deg@selskap.no"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={style.pwd_container}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="****"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} className={style.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}