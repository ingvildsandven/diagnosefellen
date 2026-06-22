import { useEffect, useState } from "react";
import { getArticles } from "../api/supabase/articles";

export function useFetchArticles(reloadKey: number = 0) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // This useffect runs whenever the arguments passed in changes (when we want to get someting else)
  useEffect(() => {
    async function APIFetch() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await getArticles();
        setData(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    APIFetch();
  }, [reloadKey]);
  return { data, isError, isLoading };
}