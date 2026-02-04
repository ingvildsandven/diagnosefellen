import style from "./PublisherLogo.module.css";

type PublisherInfo = {
  logo: string;
  title: string;
  subscription: boolean;
};

function PublisherLogo({ logo, title, subscription }: PublisherInfo) {
  return (
    <div className={style.publisher_container}>
      <img src={logo} alt={"Logoen til " + title} />
      {subscription ? <p>+</p> : ""}
    </div>
  );
}
export default PublisherLogo;
