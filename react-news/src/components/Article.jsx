import { useEffect, useState } from "react"
const API_KEY = "ab3b3bf949324614847ba7db43e668d7"

const mockArticles = [
    {
        title: "Where Does Crypto Go From Here?",
        urlToImage: "https://media.wired.com/photos/6525c8ac419624284be05210/191:100/w_1280,c_limit/HANF-Michael%20Casey.jpg",
        description: "We talk with Michael Casey, the chief content officer of CoinDesk, almost one year after the news site brought down Sam Bankman-Fried’s cryptocurrency empire FTX.",
    },
]

export const SearchBarForm = ({
        callBack = () => console.log("hi")
    }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const submitData = Object.fromEntries(formData.entries())
        if (submitData.search == '') {
            return
        }
        callBack(submitData)
    }
    
    return (
        <form action="" onSubmit={(event) => handleSubmit(event)}>
            <input type="text" name="search" id="" />
            <input type="date" name="from" id="" />
            <input type="date" name="to" id="" />
            <button type="submit">Search</button>
        </form>
    )
}

export const Article = ( {title, urlToImage, content, url} ) => {
    return (
        <article>
            <a href={url}>
                <img src={urlToImage} alt={title} />
                <h3> {title} </h3>
            </a>
            <p> {content} </p>
        </article>
    )
}

export const App = () => {
    const [loading, setLoading] = useState(true)
    const [articles, setArticles] = useState({})
    const [query, setQuery] = useState({search: "kittens"})
    
    const getData = async (query) => {
        const data = await getNews(query);
        setArticles(data)
        setLoading(false)
        console.log(data)
    }

    useEffect(
        () => {getData(query)},
        [query]
    )

    return (
        <>
            <header>
                {loading ? null : <p>Found {articles.totalResults} articles!</p>}
                <SearchBarForm callBack={setQuery}/>
            </header>
            <main>
                {loading ? null : articles.articles.map(x =>
                    <Article key={x} {...x} onClick={() => setActiveArticle(x)}></Article>
                )}
            </main>
        </>
    )
}

const getNews = async ({search: query, from, to}) => {
    const searchParams = new URLSearchParams
    searchParams.append("language", "en");
    searchParams.append("q", query);
    from && searchParams.append("from", from);
    to && searchParams.append("to", to);
    const response = await fetch(`https://newsapi.org/v2/everything?${searchParams.toString()}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "X-Api-Key": API_KEY,
        }
    });
    const articles = await response.json()
    return articles
}