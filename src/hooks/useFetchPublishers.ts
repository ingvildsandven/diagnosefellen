import { useEffect, useState } from "react";
import type { Publisher } from "../types/post.types";
import { getPublishers } from "../api/supabase/publishers";

export function useFetchPublishers(reloadKey: number = 0) {
  const [publishers, setPublishers] = useState<Publisher[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // This useffect runs whenever the arguments passed in changes (when we want to get someting else)
  useEffect(() => {
    async function APIFetch() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await getPublishers();
        setPublishers(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    APIFetch();
  }, [reloadKey]);
  return { publishers, isError, isLoading };
}
