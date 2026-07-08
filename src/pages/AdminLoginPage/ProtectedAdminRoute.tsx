import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import supabase from "../../api/supabase/client";

export default function ProtectedAdminRoute() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      setIsLoggedIn(!!data.session);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return isLoggedIn ? <Outlet /> : <Navigate to="/admin-login" replace />;
}