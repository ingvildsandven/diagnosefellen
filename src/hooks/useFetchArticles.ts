import { useEffect, useState } from "react";
import { getArticles } from "../api/supabase/articles";
import type { ArticleWithRelations, FetchArticleResponse, FetchArticlesOptions } from "../types/post.types";

export function useFetchArticles({
  page = 1,
  pageSize = 20,
  type,
  publisherId,
  sort = "newest",
}: FetchArticlesOptions = {}) {
  const [data, setData] = useState<FetchArticleResponse<ArticleWithRelations>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // This useffect runs whenever the arguments passed in changes (when we want to get someting else)
  useEffect(() => {
    async function APIFetch() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await getArticles({
          page,
          pageSize,
          type,
          publisherId,
          sort,
        });
        setData(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    APIFetch();
  }, [page, pageSize, type, publisherId, sort]);
  return { data, isError, isLoading };
}
