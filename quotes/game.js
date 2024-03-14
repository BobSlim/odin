import { Quote } from "./quote.js"

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export class Game {
    constructor(/**@type {Quote[]}*/quotes){
        /**@type {Quote[]} */
        this.quotes = shuffleArray(quotes)
    }
    try (guess) {
        const currentQuote = this.next
        currentQuote.try(guess) 
        return {quote: currentQuote, guess}
    }
    /**
     * @returns {Quote | undefined}
     */
    get next(){
        return this.quotes.find(x => x.state == Quote.CODE.MAYBE)
    }
}