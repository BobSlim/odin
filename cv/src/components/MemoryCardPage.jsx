import { useState, useEffect } from 'react'
import '../styles/MemoryCardPage.css'

function shuffleArray(source) {
    let array = source.slice(0)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function MemoryCardGame() {
    const [cardDetails, setCardDetails] = useState([])
    const [clicked, setClicked] = useState(new Set([1]))

    const getData = async () => {
        const resp = await fetch('https://api.sampleapis.com/coffee/hot');
        const json = await resp.json();
        setCardDetails(json);
    }

    const handleClick = key => e => {
        const newSet = new Set(clicked)
        if (clicked.has(key)) {
            newSet.clear()
        } else {
            newSet.add(key)
        }
        setClicked(newSet)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <main>
            <h1>Memory Game</h1>
            <p>Click a card if you haven't clicked it before. Mistakes reset your score.</p>
            <p>Score: {clicked.size}</p>
            <section className="cards">
                {shuffleArray(cardDetails).map(cardDetail => <Card {...cardDetail} key={cardDetail.id} handleClick={handleClick(cardDetail.id)}></Card>)}
            </section>
        </main>
    )
}

function Card({ title, image, handleClick }) {
    return (
        <button onClick={handleClick} className="card" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay">
                <h3>{title}</h3>
            </div>
        </button>
    )
}