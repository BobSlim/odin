const sounds = [
    { tag: 'no', src: './incorrect.mp3', volume: 0.5 },
    { tag: 'no', src: './incorrect2.mp3', volume: 0.5 },
    { tag: 'yes', src: './correct.mp3', volume: 0.5 },
    { tag: 'yes', src: './correct2.mp3', volume: 0.5 },
    { tag: 'finish', src: './finish.mp3', volume: 0.5 },
]

class Player {
    sounds = []
    add(soundFile){
        this.sounds.push({
            ...soundFile,
            audio: new Audio(soundFile.src),
        })
    }
    play(tag, controlVolume = 1){
        const sound = this.sounds.filter(x => x.tag == tag)
        const toPlay = sound[Math.floor(Math.random() * sound.length)]
        toPlay.audio.load()
        toPlay.audio.volume = toPlay.volume * controlVolume
        toPlay.audio.play()
    }
}

const PlayerSingle = new Player()
sounds.forEach(x => PlayerSingle.add(x))

export { PlayerSingle }