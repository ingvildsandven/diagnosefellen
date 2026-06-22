import { Link } from "react-router";
import style from "./NavigationComponent.module.css";
import type { LucideIcon } from "lucide-react";

type NavigationComponentProps = {
    lucideLogo: LucideIcon,
    header: string,
    link: string,
    buttonText: string,
    description: string,
}

function NavigationComponent({lucideLogo: Icon, header,link, buttonText,description}:NavigationComponentProps){

    return(
    <article className={style.navigation_article}>
        <div className={style.icon_container}>
         <Icon className={style.icon}/>
         </div>
        <h2>{header}</h2>
        <p>{description}</p>
        <Link to={link} className={style.link}>{buttonText}</Link>
    </article>

    );

}export default NavigationComponent;
