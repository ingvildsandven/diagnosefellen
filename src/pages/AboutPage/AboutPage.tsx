import style from "./AboutPage.module.css";

function AboutPage() {
  return (
    <main>
      <h1>Om meg</h1>
      <img
        src="/public/images/LeiknyHavik-Avstandsbilde.webp"
        className={style.image}
      />

      <p>
        Henriette Sandven er spesialist i barne- og ungdomspsykiatri, og er
        aktuell med boka «Diagnosefellen». Lars Lien er psykiater og leder i
        Norsk psykiatrisk forening. Begge er aktive i den pågående debatten
        omkring ADHD. Sandven uttrykker bekymring for at en økende antall barn
        får diagnosen, mens Lars Lien er opptatt av at tidlig diagnostisering og
        tilrettelegging er avgjørende for forløpet.{" "}
      </p>
      <img
        src="/public/images/LeiknyHavik-Normal.webp"
        className={style.image}
      />
    </main>
  );
}
export default AboutPage;
