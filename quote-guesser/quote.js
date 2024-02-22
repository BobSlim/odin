const clean = (str = "") => str.trim().toLocaleLowerCase()
const empty = (str = "") => str.replace(/[\S\s]/g, "_")

export class Quote {
    /**@type {-1 | 0 | 1} */state = Quote.CODE.MAYBE
    constructor(
        func = (replace = "") => `${replace}`,
        answer = '',
    ) {
        this.func = func
        this.answer = answer
    }
    try(guess = "") {
        const correct = clean(guess) == clean(this.answer)
        this.state = correct ? Quote.CODE.YES : Quote.CODE.NO
        return correct
    }
    get fullQuote() {
        return this.func(this.answer)
    }
    get emptyQuote() {
        return this.func(empty(this.answer))
    }
    get correct(){
        return this.state > 0
    }
    static get CODE() {
        return {
            NO: -1,
            MAYBE: 0,
            YES: 1,
        }
    }
}

