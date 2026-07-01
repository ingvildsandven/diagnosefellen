import supabase from "../../api/supabase/client";
import { useFetchMetadata } from "../../hooks/useFetchMetadata";

function AdminPage() {
    const {data, isError, isLoading} = useFetchMetadata("https://www.aftenposten.no/amagasinet/i/vgGeA5/psykiater-henriette-k-sandven-ut-mot-adhd-diagnoser")

    console.log("RRR" ,data, isError, isLoading)
  return <div>Admin</div>;
}
export default AdminPage;
