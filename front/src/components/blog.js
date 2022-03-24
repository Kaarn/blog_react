import React, {useEffect, useState} from "react";
import Article from "./article";

const Blog = () => {

    const [articleList, setArticleList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080')
            .then(response => response.json()
            .then(l => {
                setArticleList(l);
            }))
    }, [])

    return (
        <section>
            {
                articleList &&
                articleList.map(obj => <Article art={obj} key={obj.id} />)
            }
        </section>
    )
}

export default Blog;