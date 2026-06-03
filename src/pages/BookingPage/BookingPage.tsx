import BookingForm from "../../components/BookingForm/BookingForm";
import Kicker from "./components/Kicker/Kicker";
import style from "./BookingPage.module.css";
import BottomNote from "./components/BottomNote/BottomNote";

function BookingPage() {
  return (

      <main className={style.main}>
        <section className={style.header}>
          <Kicker kickerText={"Bookingforespørsel"} />
          <h1 className={style.title}>Henvendelse</h1>
          <p className={style.subtext}>
            Kontakt meg her, så svarer jeg fortløpende.
          </p>
        </section>
        <BookingForm />
        <BottomNote />
      </main>

  );
}
export default BookingPage;
