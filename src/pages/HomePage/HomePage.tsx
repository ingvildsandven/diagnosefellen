import { useEffect } from "react";
import supabase from "../../api/supabase/client";

function HomePage() {
  useEffect(() => {
    (async () => {
      try {
        let { data: posts, error } = await supabase.from("posts").select("*");
        console.log(posts, error);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return <div>Henriette Sandven</div>;
}
export default HomePage;
