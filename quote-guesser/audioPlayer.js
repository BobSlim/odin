const sounds = [
    { tag: 'no', src: './incorrect.mp3', volume: 0.5 },
    { tag: 'no', src: './incorrect2.mp3', volume: 0.5 },
    { tag: 'yes', src: './correct.mp3', volume: 0.5 },
    { tag: 'yes', src: './correct2.mp3', volume: 0.5 },
    { tag: 'finish', src: './finish.mp3', volume: 0.5 },
]
    .map(x => ({ ...x, player: new Audio(x.src) }));

sounds.forEach(x => x.player.volume = x.volume)

export const playSound = (tag) => {
    const sound = sounds.filter(x => x.tag == tag)
    const player = sound[Math.floor(Math.random() * sound.length)].player
    player.play()
}