import FeedPost from "../../components/FeedPost/FeedPost";
import style from "./PostPage.module.css";
import { useFetchArticles } from "../../hooks/useFetchArticles";
import { useState } from "react";
import type { ArticleType } from "../../types/post.types";
import SortingContainer from "./components/SortingContainer";
import SearchBar from "./components/SearchBar";

function PostPage() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>("");
  const [filterType, setFilterType] = useState<ArticleType | undefined>();
  const [filterPublisher, setFilterPublisher] = useState<string>(); // TODO: publisher id is not known here...
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const { data, isError, isLoading } = useFetchArticles({
    page: page,
    pageSize: pageSize,
    type: filterType,
    publisherId: filterPublisher,
    sort: sort,
  });
  console.log(data, isLoading, isError);


  return (
    <main>
      <h1>Aktivitetslogg</h1>

      <SortingContainer
        filterType={filterType}
        setFilterType={setFilterType}
        filterPublisher={filterPublisher}
        setFilterPublisher={setFilterPublisher}
        sort={sort}
        setSearch={setSearch}
        search={search}
        setSort={setSort}
      />

      <section className={style.article_container}>
        {data?.articles.map((article) => (
          <FeedPost key={article.id} post={article} />
        ))}
      </section>
    </main>
  );
}
export default PostPage;
