import { useMemo, useState, type FormEvent } from "react";
import styles from "./BookingForm.module.css";
import { EVENT_TYPES, type BookingFormProps, type BookingPayload, type EventType, type FormErrors } from "../../types/booking.types";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function formatDateForMin(d = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState<EventType>(EVENT_TYPES[0].value);
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [touched, setTouched] = useState({
    email: false,
    date: false,
    content: false,
  });

  const minDate = useMemo(() => formatDateForMin(new Date()), []);

  const errors = useMemo(() => {
    const e: FormErrors = {};

    if (!email.trim()) e.email = "Mailadresse er påkrevd";
    else if (!isValidEmail(email)) e.email = "Skriv inn en gyldig mailadresse.";

    if (!date) e.date = "Velg en dato.";

    if (!content.trim()) e.content = "Legg til en kort melding.";
    else if (content.trim().length < 10)
      e.content = "Legg til flere detaljer (minst 10 tegn)";
    else if (content.trim().length > 1000) e.content = "Maks 1000 tegn";

    return e;
  }, [email, date, content]);

  const isFormValid = Object.keys(errors).length === 0;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ email: true, date: true, content: true });

    if (!isFormValid) {
      setStatus({ type: "error", message: "Oppdater de markerte feltene." });
      return;
    }

    const payload: BookingPayload = {
      email: email.trim(),
      eventType,
      date,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    console.log(payload)

    try {
      setStatus({ type: "loading", message: "Sender inn..." });

      if (typeof onSubmit === "function") {
        await onSubmit(payload);
      } else {
        // Replace this with your API call.
        await new Promise((r) => setTimeout(r, 450));
      }

      setStatus({
        type: "success",
        message: "Takk! Din forespørsel har blitt sendt.",
      });
      setEmail("");
      setEventType(EVENT_TYPES[0].value);
      setDate("");
      setContent("");
      setTouched({ email: false, date: false, content: false });
    } catch {
      setStatus({
        type: "error",
        message: "Noe gikk galt. Prøv igjen senere.",
      });
    }
  }

  const emailInvalid = touched.email && !!errors.email;
  const dateInvalid = touched.date && !!errors.date;
  const contentInvalid = touched.content && !!errors.content;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <section className={styles.input_container}>
        <article className={styles.input_field_article }>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="deg@selskap.no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={`${styles.input} ${emailInvalid ? styles.inputInvalid : ""}`}
            required
          />
          {emailInvalid && (
            <div className={styles.error} id="email-error" role="alert">
              {errors.email}
            </div>
          )}
        </article>

        <article className={styles.input_field_article }>
          <label className={styles.label} htmlFor="eventType">
            Arrangement
          </label>
          <div className={styles.selectWrap}>
            <select
              id="eventType"
              name="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
              className={styles.select}
            >
              {EVENT_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className={styles.pulldown_btn} aria-hidden="true">
              ▾
            </span>
          </div>
        </article>

        <article className={styles.input_field_article }>
          <label className={styles.label} htmlFor="date">
            Foretrukket dato
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, date: true }))}
            className={`${styles.input} ${dateInvalid ? styles.inputInvalid : ""}`}
          />
          {dateInvalid && (
            <div className={styles.error} id="date-error" role="alert">
              {errors.date}
            </div>
          )}
        </article>
      </section>

      <section className={styles.message_container}>
        <article className={`${styles.message_field_article} ${styles.fieldFull}`}>
          <label className={styles.label} htmlFor="content">
            Melding
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            placeholder="Skriv hva du ønsker (tema, tid, målgruppe, linker osv.)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, content: true }))}
            className={`${styles.textarea} ${contentInvalid ? styles.inputInvalid : ""}`}
            required
          />
          {!contentInvalid ? (
            <div className={styles.help} id="content-help">
              Hold det kort - inkluder kun viktige detaljer.
            </div>
          ) : (
            <div className={styles.error} id="content-error" role="alert">
              {errors.content}
            </div>
          )}
        </article>
      </section>

      <section className={styles.footer}>
        <button
          type="submit"
          className={styles.button}
          disabled={status.type === "loading"}
        >
          {status.type === "loading" ? "Laster..." : "Send forespørsel"}
        </button>

        <div
          className={`${styles.status} ${
            status.type === "success"
              ? styles.statusSuccess
              : status.type === "error"
                ? styles.statusError
                : ""
          }`}
        >
          {status.message}
        </div>
      </section>
    </form>
  );
}
