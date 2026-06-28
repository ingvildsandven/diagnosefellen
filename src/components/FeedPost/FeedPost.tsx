import type { ArticleWithRelations } from "../../types/post.types";
import PublisherLogo from "../PublisherLogo/PublisherLogo";
import style from "./FeedPost.module.css";

function FeedPost({ post }: { post: ArticleWithRelations }) {
  return (
    <a href={post.link} target="_blank" className={style.link}>
      <article className={style.article}>
        {post.images[0].image ? (
          <img
            src={post.images[0].image}
            alt={post.images[0].alt}
            className={style.image}
          />
        ) : (
          ""
        )}

        <p className={style.date}>{post.date}</p>
        <p className={style.type}>{post.type}</p>

        {post.publisher ? (
          <PublisherLogo
            logo={post.publisher.logo}
            title={post.publisher.title}
            subscription={post.subscription}
          />
        ) : (
          ""
        )}

        <div className={style.content_container}>
          {post.images[0].image ? (
            <h2>{post.title}</h2>
          ) : (
            <h2 className={style.padding_side}>{post.title}</h2>
          )}
          <p>{post.description}..</p>
        </div>
      </article>
      <div className={style.continue_container}>
        <p>Fortsett å lese</p>
        <span className={style.arrow_icon}></span>
      </div>
    </a>
  );
}
export default FeedPost;
