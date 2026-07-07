import ErrorBox from "../../../../components/ErrorBox/ErrorBox";
import Loader from "../../../../components/Loader/Loader";
import { useFetchArticles } from "../../../../hooks/useFetchArticles";
import style from "./ArticlesList.module.css";

function ArticlesList() {
  let { data, isError, isLoading } = useFetchArticles();

  if (isLoading) {
    return (
      <section className={style.section}>
        <Loader size="large" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className={style.section}>
        <ErrorBox message="Kunne ikke hente liste over alle artikler" />
      </section>
    );
  }

  return (
    <section className={style.section}>
      {data?.articles.map((article) => (
        <article key={article.id} className={article.id}>
          {article.title}
        </article>
      ))}
    </section>
  );
}
export default ArticlesList;
