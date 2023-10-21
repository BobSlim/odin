import { useState, useEffect } from 'react'
import { getData, shuffleArray } from './utils'
import styles from './MemoryCardPage.module.css'

export function MemoryCardGame() {
    const [cardDetails, setCardDetails] = useState([])
    const [clicked, setClicked] = useState(new Set([1]))

    const loadData = async () => {
        const data = await getData('https://fakestoreapi.com/products', 12)
        setCardDetails(data)
    }

    const handleClick = key => e => {
        const newSet = new Set(clicked)
        if (clicked.has(key)) {
            newSet.clear()
        } else {
            newSet.add(key)
        }
        setClicked(newSet)
        const shuffled = shuffleArray(cardDetails)
        setCardDetails(shuffled)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <main>
            <h1>Memory Game</h1>
            <p>Click a card if you haven't clicked it before. Mistakes reset your score.</p>
            <p>Score: {clicked.size}</p>
            <section className={styles.cards}>
                {cardDetails.map(cardDetail => <Card {...cardDetail} key={cardDetail.id} handleClick={handleClick(cardDetail.id)}></Card>)}
            </section>
        </main>
    )
}

function Card({ title, image, handleClick }) {
    return (
        <button onClick={handleClick} className={styles.card} style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay">
                <h3>{title}</h3>
            </div>
        </button>
    )
}