import BookingForm from "../../components/BookingForm/BookingForm";
import Kicker from "./components/Kicker/Kicker";
import style from "./BookingPage.module.css";
import BottomNote from "./components/BottomNote/BottomNote";
import supabase from "../../api/supabase/client";

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

      <BookingForm
        onSubmit={async (payload: any) => {
          const { error } = await supabase.functions.invoke(
            "send-booking-email",
            {
              body: payload,
            },
          );

          if (error) throw error;
        }}
      />
      <BottomNote />
    </main>
  );
}
export default BookingPage;
