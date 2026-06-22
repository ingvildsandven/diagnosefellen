import FeedPost from "../../components/FeedPost/FeedPost";
import post from "../../api/postData.json";
import style from "./PostPage.module.css"
import SortingContainer from "./components/SortingContainer";

function PostPage() {
  return (
    <main>
      <h1>Aktivitetslogg</h1>

      <SortingContainer/>

      <section className={style.article_container}>
        <FeedPost post={post[2]} />
        <FeedPost post={post[0]} />
        <FeedPost post={post[1]} />
        
      </section>
    </main>
  );
}
export default PostPage;
