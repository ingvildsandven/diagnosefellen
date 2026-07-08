import supabase from "../../api/supabase/client";
import { useNavigate } from "react-router";
import style from "./LogoutButton.module.css";

export default function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin-login");
  }

  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
