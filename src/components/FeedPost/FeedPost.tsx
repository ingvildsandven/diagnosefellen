import style from "./FeedPost.module.css";

type ImageInfo = {
  image: string;
  photographer: string;
  alt: string;
};

type Post = {
  title: string;
  description: string;
  type: string;
  date: string;
  subscription: boolean;
  images: ImageInfo[];
  publisher: {
    logo: string;
    title: string;
    journalists: string[];
  };
  link: string;
};

function FeedPost({ post }: { post: Post }) {
  return (
    <article className={style.article}>
      <a href={post.link} target="_blank">
        <div className={style.tag_container}>
          <p>{post.date}</p>
          <p>{post.type}</p>
           {post.subscription && (<p>Abonnement sak</p>)}
        </div>

        <h2>{post.title}</h2>
        <p>{post.description}</p>

        <img src={post.images[0].image} alt={post.images[0].alt} />
      </a>
    </article>
  );
}
export default FeedPost;
