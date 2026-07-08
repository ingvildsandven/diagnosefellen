import styles from "./AdminPage.module.css";
import { useFetchMetadata } from "../../hooks/useFetchMetadata";
import { useEffect, useState, type FormEvent } from "react";
import PublisherDropdown from "../../components/PublisherDropdown/PublisherDropdown";
import { ARTICLE_TYPES, type ArticleType } from "../../types/post.types";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import { createArticle } from "../../api/supabase/articles";
import Loader from "../../components/Loader/Loader";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import SuccessBox from "./components/SuccessBox/SuccessBox";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

function formatDate(date: string) {
  return date?.split("T")[0] ?? "";
}

function AdminPage() {
  // Fields to update
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [subscription, setSubscription] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [type, setType] = useState<ArticleType | undefined>();
  const [publisher, setPublisher] = useState<string>();

  // User feedback
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Metadata
  const { data, isError, isLoading } = useFetchMetadata(url);

  useEffect(() => {
    if (!data) return;
    if (data) {
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
      if (data.image) setImgLink(data.image);
      if (data.publishedTime) setDate(formatDate(data.publishedTime));
    }
  }, [data]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const response = await createArticle({
      title,
      date,
      link: url,
      type,
      subscription,
      publisher_id: publisher,
      description,
      imgLink,
    });

    if (response?.error) {
      setFormError("Kunne ikke lagre artikkelen.");
      return;
    }

    setSuccessMessage("Artikkelen ble lagt til.");
    resetFields();
  }

  function resetFields() {
    setUrl("");
    setTitle("");
    setSubscription(false);
    setDescription("");
    setDate("");
    setImgLink("");
    setType(undefined);
    setPublisher(undefined);
  }

  function validateForm() {
    if (!url.trim()) return "Link må fylles ut.";
    if (!publisher) return "Velg en publisher.";
    if (!type) return "Velg en artikkeltype.";
    if (!title.trim()) return "Tittel må fylles ut.";
    if (!date) return "Dato må fylles ut.";
    if (!description.trim()) return "Artikkelbeskrivelse må fylles ut.";

    return "";
  }

  return (
    <main>
      <LogoutButton />
      <h1>Admin</h1>
      <section className={styles.section}>
        <article className={styles.link_article}>
          <label className={styles.label} htmlFor="link">
            Link til side:
          </label>

          {isLoading ? (
            <Loader />
          ) : (
            <input
              id="link"
              name="link"
              type="url"
              placeholder="www.ett-eller-annet.no"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onPaste={(e) => {
                const pastedUrl = e.clipboardData.getData("text");
                setUrl(pastedUrl);
              }}
              className={styles.input}
              required
            />
          )}

          {isError ? (
            <ErrorBox message={"Kunne ikke hente data fra denne linken"} />
          ) : (
            ""
          )}
        </article>

        <article className={styles.pulldown_article}>
          <PublisherDropdown onChange={setPublisher} value={publisher} />

          <select
            className={styles.select}
            required
            value={type ?? ""}
            onChange={(e) =>
              setType(
                e.target.value === ""
                  ? undefined
                  : (e.target.value as ArticleType),
              )
            }
            aria-label="Filtrer etter type"
          >
            <option value="">Alle typer</option>
            {ARTICLE_TYPES.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className={styles.checkbox_container}>
            <input
              id="subscribe"
              name="subscribe"
              checked={subscription}
              type="checkbox"
              onChange={(e) => setSubscription(e.target.checked)}
              className={styles.input}
              required
            />
            <label htmlFor="subscribe"> Subscription needed</label>
          </div>
        </article>
      </section>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.label} htmlFor="tittel">
          Tittel:
        </label>
        <input
          id="tittel"
          name="tittel"
          type="text"
          placeholder="tittel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label} htmlFor="date">
          Dato:
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label} htmlFor="image">
          Image link:
        </label>
        <input
          id="image"
          name="image"
          type="text"
          placeholder="bilde"
          value={imgLink}
          onChange={(e) => setImgLink(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label} htmlFor="content">
          Artikkel beskrivelse:
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          placeholder="Intro til denne artikkelen"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          required
        />

        {formError && <ErrorBox message={formError} />}

        {successMessage && <SuccessBox message={successMessage} />}

        <button type="submit" className={styles.button}>
          Legg til artikel
        </button>
      </form>

      <ArticlesList />
    </main>
  );
}
export default AdminPage;
