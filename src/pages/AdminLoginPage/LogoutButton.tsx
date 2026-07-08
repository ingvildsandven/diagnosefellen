import supabase from "../../api/supabase/client";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin-login");
  }

  return <button onClick={handleLogout}>Logout</button>;
}
