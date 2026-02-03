import style from "./PublisherLogo.module.css"

type PublisherInfo = {
    logo: string,
    title: string,
}

function PublisherLogo({ logo, title }: PublisherInfo){

    return(
        <div>
            <img src={logo} alt={"Logoen til" + logo} />
            <p>{title}</p>
        </div>
    )
} export default PublisherLogo;