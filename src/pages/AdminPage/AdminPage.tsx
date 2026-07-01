import styles from "./AdminPage.module.css";
import { useFetchMetadata } from "../../hooks/useFetchMetadata";
import { useEffect, useState, type FormEvent } from "react";

function formatDate(date: string) {
  return date?.split("T")[0] ?? "";
}

function AdminPage() {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
      const [date, setDate] = useState("");
      const [imgLink, setImgLink] = useState("");
  const { data, isError, isLoading } = useFetchMetadata(url);

  useEffect(() => {
    if (data) {
      if (data.title) setTitle(data.title);
      if (data.description) setContent(data.description);
      if(data.image) setImgLink(data.image);
      if (data.publishedTime) setDate(formatDate(data.publishedTime));
    }
  }, [url]);
  console.log("RRR", data, isError, isLoading, date);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <main>
      <label className={styles.label} htmlFor="link">
        Link til side:
      </label>
      <input
        id="link"
        name="link"
        type="link"
        placeholder="www.ett-eller-annet.no"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={styles.input}
        required
      />

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.label} htmlFor="tittel">
          Tittel:
        </label>
        <input
          id="tittel"
          name="tittel"
          type="input"
          placeholder="tittel"
          value={title}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label} htmlFor="date">
          Dato
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
        />

                <label className={styles.label} htmlFor="image">
          Image link:
        </label>
        <input
          id="image"
          name="image"
          type="input"
          placeholder="bilde"
          value={imgLink}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          required
        />

         <label className={styles.label} htmlFor="content">
            Artikkel beskrivelse
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            placeholder="Intro til denne artikkelen"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea} 
            required
          />
      </form>
    </main>
  );
}
export default AdminPage;
