import React from "react";
import { Link } from "react-router-dom";

const Article = props => {
    return (
        <article id={props.art.id}>
            <h4>
                <Link to={'/articles/' + props.art.slug}>
                    {props.art.titre}
                </Link>
            </h4>
            <p>{props.art.content}</p>
            <ul>
                <li>{props.art.creation_date}</li>
                <li>{props.art.prenom}</li>
                <li>{props.art.nom.toUpperCase()}</li>
            </ul>
        </article>
    )
}

export default Article;