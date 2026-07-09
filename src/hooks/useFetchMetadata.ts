import { useEffect, useState } from "react";
import { getMetadata } from "../api/supabase/metadata";

export function useFetchMetadata(
  url
: string) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false)

  // This useffect runs whenever the arguments passed in changes (when we want to get someting else)
  useEffect(() => {
    async function APIFetch() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await getMetadata(url);
        setData(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    APIFetch();
  }, [url]);
  return { data, isError, isLoading };
}
