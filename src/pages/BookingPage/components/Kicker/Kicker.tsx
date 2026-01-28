import style from "./Kicker.module.css"

function Kicker( { kickerText } : {kickerText: string}){

    return(
        <article className={style.kicker}>
          <span className={style.kickerDot} />
          <p>{kickerText}</p>
        </article>
    );
} export default Kicker;