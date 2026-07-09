import style from "./HomePage.module.css";
import { Link } from "react-router";
import NavigationComponent from "./components/NavigationComponent";
import { Newspaper, Presentation, UserRound } from "lucide-react";

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
      header: "Om Henriette",
      link: "/about/",
      buttonText: "Les mer",
      description:
        "Lær mer om forfatteren og hennes engasjement for barns helse",
    },
  ];

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

      <section className={style.diagnose_section}>
        <h2>Hva er Diagnosefellen?</h2>
        <p>
          En diagnosefelle er et fenomen hvor en diagnose kan gi utilsiktede
          konsekvenser. Dette er spesielt uheldig når det gjelder barn. Barn har
          ofte ikke selv et språk for hva de strever med, og ber sjelden selv om
          utredninger - til tross for at det er de som skal leve med
          konsekvensene av å ha en diagnose. En diagnose kan bli en felle dersom
          den settes på feil eller tynt grunnlag - eller den fører til at barnet
          inntar en uheldig sykerolle som i verste fall fører til en dårligere
          prognose.
        </p>

        <p>
          I 2025 ga Henriette Kirkaune Sandven ut boka Diagnosefellen om
          sykeliggjøringen av norske barn.
        </p>
      </section>

      <section className={style.book_section}>
        <div className={style.text_container}>
          <h2>Om boka</h2>
          <p>
            Diagnosefellen- om sykeliggjøringen av norske barn tar for seg den
            enorme økninger av henvisninger til barne - og ungdomspsykiatrien de
            siste årene og hvordan dette har resultert i en stor økning i påvist
            psykisk sykdom gjennom en psykiatrisk diagnose. Boka retter et
            kritisk blikk på samfunnet, og reflekterer over forhold i samfunnet
            som er med på å påvirke denne utviklingen. Den stiller spørsmål ved
            hvorvidt vi over- og feildiagnostiserer barn, men også om vi har
            fått et samfunn hvor stadig flere barn har det vanskelig. Hensikten
            med boka er å påpeke at det er behov for system - og politiske
            endringer til det beste for alle barn som vokser opp i Norge.
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
            src="https://i.postimg.cc/L8zBZMgd/book.webp"
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
