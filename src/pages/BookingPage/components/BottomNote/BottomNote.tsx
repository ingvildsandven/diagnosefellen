import style from "./BottomNote.module.css";

function BottomNote() {
  return (
    <div className={style.note}>
      <span className={style.noteDot} aria-hidden="true" />
      <span>Forespørselen besvares på din mail.</span>
    </div>
  );
}
export default BottomNote;
