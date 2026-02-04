import FeedPost from "../../components/FeedPost/FeedPost";
import post from "../../api/postData.json";
import style from "./PostPage.module.css"

function PostPage() {
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
