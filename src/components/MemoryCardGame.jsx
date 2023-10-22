import { useState, useEffect } from 'react'
import { findObjectById, getData, shuffleArray } from './utils'
import styles from './MemoryCardPage.module.css'
import { useOutletContext } from 'react-router-dom'
import { LoadingSpinner } from './LoadingSpinner'

export function MemoryCardGame() {
    const cardDetails = useOutletContext()[2]
    const [presentationId, setPresentationId] = useState([])
    const [clicked, setClicked] = useState(new Set([1]))

    const shuffle = () => {
        const newArray = shuffleArray(cardDetails.map(x => x.id))
        setPresentationId(newArray)
    }

    const handleClick = key => e => {
        const newSet = new Set(clicked)
        if (clicked.has(key)) {
            newSet.clear()
        } else {
            newSet.add(key)
        }
        setClicked(newSet)
        shuffle()
    }

    useEffect((shuffle), [cardDetails])

    return (
        <main>
            <h1>Memory Game</h1>
            <p>Click a card if you haven't clicked it before. Mistakes reset your score.</p>
            <p>Score: {clicked.size}</p>
            { presentationId.length ? 
                <section className={styles.cards}>
                    {presentationId.map(id => <Card {...findObjectById(cardDetails, id)} key={id} handleClick={handleClick(id)}></Card>)}
                </section>
                :
                <LoadingSpinner/>
            }
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