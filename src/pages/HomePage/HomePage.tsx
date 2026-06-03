import { useEffect } from "react";
import supabase from "../../api/supabase/client";
import style from "./HomePage.module.css";
import { Link } from "react-router";
import NavigationComponent from "./components/NavigationComponent";
import {
  Newspaper,
  Presentation,
  UserRound,
} from "lucide-react";

function HomePage() {
  const navLinks = [
    {
      lucideLogo: Newspaper,
      header: "I media",
      link: "../posts/",
      buttonText: "Se oppslag",
      description:
        "Les artikler, debatter og intervjuer med Henriette i norske medier",
    },
    {
      lucideLogo: Presentation,
      header: "Foredrag",
      link: "/booking/",
      buttonText: "Bestill nå",
      description:
        "Bestill Henriette til foredrag i din organisasjon eller på ditt arrangement",
    },
    {
      lucideLogo: UserRound,
      header: "Om henriette",
      link: "/about/",
      buttonText: "Les mer",
      description:
        "Lær mer om forfatteren og hennes engasjement for barns helse",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        let { data: posts, error } = await supabase.from("posts").select("*");
        console.log(posts, error);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <main>
      <section className={style.intro_section}>
        <h1>Diagnosefellen</h1>
        <p>Den økende sykeliggjøringen av norske barn</p>

        <div className={style.intro_link_container}>
          <Link className={style.intro_link} to={"/about/"}>
            {" "}
            Om Henriette Sandven
          </Link>
          <Link className={style.intro_link} to={"/posts/"}>
            {" "}
            Se alle mediaoppslag
          </Link>
        </div>
      </section>

      <section className={style.book_section}>
        <div className={style.text_container}>
          <h2>Om boka</h2>
          <p className={style.description}>
            Forekomsten av psykiske lidelser blant barn og unge har eksplodert.
            Omtrent 1 av 5 har en diagnose. Bruken av psykiatriske legemidler
            for barn og unge er firedoblet de siste 20 årene. I gruppen unge
            voksne rapporterte 40 prosent av jentene og 25 prosent av guttene om
            så store vansker at de kunne fått en psykiatrisk diagnose. Barne- og
            ungdomspsykiater Henriette Kirkaune Sandven retter et kritisk blikk
            på dagens samfunn og hvordan vi stadig oftere sykeliggjør barn og
            unge.
          </p>

          <p className={style.quote}>
            "Hvis utviklingen fortsetter, kan vi bevege oss mot en situasjon der
            barn medisineres fordi systemet rundt dem gjør det vanskelig å være
            barn. Medisinering påvirker ikke bare det enkelte barn, men også
            tålegrensen for atferd som hittil har vært ansett som vanlig
            flyttes."
          </p>
        </div>

        <div className={style.image_container}>
          <img
            src="./book/14.png"
            alt="Bildet viser forsiden til boken 'diagnosefellen'"
          />
        </div>
      </section>

      <section className={style.navigation_section}>
        {navLinks.map((navLink, index) => {
          return (
            <NavigationComponent
              key={index}
              lucideLogo={navLink.lucideLogo}
              header={navLink.header}
              link={navLink.link}
              buttonText={navLink.buttonText}
              description={navLink.description}
            />
          );
        })}
      </section>
    </main>
  );
}
export default HomePage;
