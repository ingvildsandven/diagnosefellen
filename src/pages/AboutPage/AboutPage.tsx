import Accordion from "../../components/Accordian/Accordian";
import style from "./AboutPage.module.css";

function AboutPage() {
  const faqs = [
    { id: "1", question: "Hva er diagnosefellen?", answer: "..." },
    {
      id: "2",
      question: "Hvem er målgruppen for boken?",
      answer: "Boken henvender seg til...",
    },
  ];

  return (
    <main>
      <h1>Om Henriette Kirkaune Sandven</h1>
      <section className={style.about_section}>
        <article>
          <img
            src="/public/images/LeiknyHavik-Normal.webp"
            className={style.image}
          />
        </article>

        <article className={style.paragraph_article}>
          <p>
            Henriette Sandven er forfatter, foredragsholder og en engasjert
            stemme i debatten om barns helse i Norge. Med sin bok
            "diagnosefellen" har hun satt søkelyset på den økende medisineringen
            av barn og behovet for kritisk refleksjon rundt diagnoser og
            behandlingsmetoder.
          </p>{" "}
          <p>
            Gjennom sitt arbeid ønsker Henriette å skape rom for nyanserte
            samtaler om barns helse, utvikling og velvære. Hun utfordrer
            etablerte sannheter og oppfordrer til å tenke bredt om hva barn
            egentlig trenger for å utvikle seg optimalt.
          </p>{" "}
          <p>
            Siden boken kom ut har Henriette vært en hyppig gjest i norske
            medier, hvor hun deler sin kunnskap og perspektiver på denne viktige
            samfunnsdebatten.
          </p>
        </article>
      </section>

<section className={style.accordion_section}>
      <Accordion title="Ofte stilte spørsmål" items={faqs} /></section>
    </main>
  );
}
export default AboutPage;
