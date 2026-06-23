import FeedPost from "../../components/FeedPost/FeedPost";
import post from "../../api/postData.json";
import style from "./PostPage.module.css";
import { useFetchArticles } from "../../hooks/useFetchArticles";
import { useState } from "react";
import type { ArticleType } from "../../types/post.types";
import { useFetchPublishers } from "../../hooks/useFetchPublishers";

function PostPage() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterType, setFilterType] = useState<ArticleType | undefined>();
  const [filterPublisher, setPublisher] = useState<any>(); // TODO: publisher id is not known here...
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const { data, isError, isLoading } = useFetchArticles({
    page: page,
    pageSize: pageSize,
    type: filterType,
    publisherId: filterPublisher,
    sort: sort,
  });
  console.log(data, isLoading, isError);

  const { publishers } = useFetchPublishers();
  console.log(publishers, isLoading, isError);

  return (
    <main>
      <h1>Aktivitetslogg</h1>
      <select>
        <option>Artikler</option>
        <option>Kronikker</option>
        <option>Anmeldelser</option>
      </select>

      <section className={style.article_container}>
        {data?.articles.map((article) => (
          <FeedPost key={article.id} post={article} />
        ))}

      </section>
    </main>
  );
}
export default PostPage;
