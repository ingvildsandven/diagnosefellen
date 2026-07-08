import { ArrowUpRight } from "lucide-react";
import type { ArticleWithRelations } from "../../types/post.types";
import PublisherLogo from "../PublisherLogo/PublisherLogo";
import style from "./FeedPost.module.css";

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
};

function FeedPost({ post }: { post: ArticleWithRelations }) {
  return (
    <a href={post.link} target="_blank" className={style.link}>
      <article className={style.article}>
        {post.images.length ? (
          <img
            src={post.images[0].image}
            alt={post.images[0].alt ? post.images[0].alt : ""}
            className={style.image}
          />
        ) : (
          ""
        )}

        {post.publisher ? (
          <PublisherLogo
            logo={post.publisher.logo}
            title={post.publisher.title}
            subscription={post.subscription}
          />
        ) : (
          ""
        )}

        {/* post.images.length*/}
        <div
          className={`${style.date_type_container} ${
            post.images.length ? "" : style.noImage
          }`}
        >
          <p className={style.type}>{post.type}</p>
          <p className={style.date}>{formatDate(post.date)}</p>
        </div>

        <div
          className={`${post.images.length ? "" : style.noImages
          } ${style.line_container}`}
        >
          <span className={style.line}></span>
        </div>

        <div className={style.content_container}>
          <h2>{post.title}</h2>
          <p>{post.description}..</p>
        </div>

        <div className={style.continue_container}>
          <p>Fortsett å lese</p>
          <ArrowUpRight color="white" className={style.icon} />
        </div>
      </article>
    </a>
  );
}
export default FeedPost;
