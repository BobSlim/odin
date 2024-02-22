import { Game } from "./game.js"
import { Quote } from "./quote.js"
import { allQuotes } from "./data.js"
import { playSound } from "./audioPlayer.js"

const game = new Game(allQuotes)

const container = document.getElementById('unfinished')
const form = document.getElementById('form')
const log = document.getElementById('log')
const counter = document.getElementById('counter')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = game.try(new FormData(form).get('guess'))
    form.reset()
    playSound(data?.quote?.correct ? 'yes' : 'no')
    render(data)
})

const render = (data) => {
    if(data != undefined) {
        renderLog(data)
    }
    updateCounter(game.quotes)
    let nextQuote = game.next?.emptyQuote
    if (nextQuote == undefined) {
        nextQuote = completeGame(game.quotes)
    }
    container.innerText = nextQuote
}

const completeGame = (quoteList) => {
    const correct = quoteList.filter(x => x.correct).length
    form.getElementsByTagName('button')[0].disabled = true
    form.getElementsByTagName('input')[0].disabled = true
    playSound('finish')
    return `You got ${correct}/${quoteList.length} correct.`
}

const updateCounter = (quoteList) => {
    const length = quoteList.length
    counter.innerText = `${length - quoteList.filter(x => x.state == Quote.CODE.MAYBE).length}/${length}`
}

const renderLog = (data = {}) => {
    if (data == undefined) {
        return
    }
    const toggleLogClass = (correct) => {
        const noClass = 'log--no'
        const yesClass = 'log--yes'
        log.classList.remove(correct ? noClass : yesClass)
        log.classList.add(correct ? yesClass : noClass)
    }
    toggleLogClass(data.quote.correct)
    const msg = `${data.quote.correct ? "✔️" : "❌"} ${data.quote.fullQuote}`
    log.getElementsByClassName('log__content')[0].innerText = msg
}

render()