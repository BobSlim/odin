import { Game } from "./game.js"
import { Quote } from "./quote.js"
import { allQuotes } from "./data.js"
import { PlayerSingle } from "./audioPlayer.js"

const game = new Game(allQuotes)

const container = document.getElementById('unfinished')
const form = document.getElementById('form')
const input = form.getElementsByTagName('input')[0]
const log = document.getElementById('log')
const counter = document.getElementById('counter')

document.addEventListener('click', (e) => {
    input.focus()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = game.try(formData.get('guess'))
    const vol = formData.get('volume')
    input.value = ""
    PlayerSingle.play(data?.quote?.correct ? 'yes' : 'no', vol)
    render(data, vol)
    input.focus()
})

const render = (data, vol) => {
    if(data != undefined) {
        renderLog(data)
    }
    updateCounter(game.quotes)
    let nextQuote = game.next?.emptyQuote
    if (nextQuote == undefined) {
        nextQuote = completeGame(game.quotes, vol)
    }
    container.innerText = nextQuote
}

const completeGame = (quoteList, vol) => {
    const correct = quoteList.filter(x => x.correct).length
    form.getElementsByTagName('button')[0].disabled = true
    form.getElementsByTagName('input')[0].disabled = true
    PlayerSingle.play('finish', vol)
    return `You got ${correct}/${quoteList.length} correct.`
}

const updateCounter = (quoteList) => {
    const length = quoteList.length
    const finished = length - quoteList.filter(x => x.state == Quote.CODE.MAYBE).length
    counter.innerText = `${finished}/${length}`
    counter.value = finished
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