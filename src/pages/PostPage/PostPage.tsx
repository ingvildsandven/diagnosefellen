import FeedPost from "../../components/FeedPost/FeedPost";
import post from "../../api/postData.json";
import style from "./PostPage.module.css"
import { getArticles } from "../../api/supabase/articles";
import { useFetchArticles } from "../../hooks/useFetchArticles";

function PostPage() {
    const {data, isError, isLoading} = useFetchArticles();
  console.log(data, isLoading, isError);
  return (
    <main>
      <h1>Aktivitetslogg</h1>
      <select>
        <option>Artikler</option>
        <option>Kronikker</option>
        <option>Anmeldelser</option>
      </select>

      <section className={style.article_container}>
        <FeedPost post={post[2]} />
        <FeedPost post={post[0]} />
        <FeedPost post={post[1]} />
        
      </section>
    </main>
  );
}
export default PostPage;
