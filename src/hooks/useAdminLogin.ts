import { useState } from "react";
import supabase from "../api/supabase/client";

export function useAdminLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function login(email: string, password: string) {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return false;
    }

    return true;
  }

  return {
    login,
    loading,
    errorMsg,
  };
}