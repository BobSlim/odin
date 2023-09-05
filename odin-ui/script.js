const dropdowns = document.getElementsByClassName("dropdown")
for (dropdown of dropdowns) {
    dropdown.addEventListener("mouseover", () => {showdrop()})
}

function showdrop() {
    dropdown.getElementsByClassName("dropdown_list")[0].classList.toggle("hidden");
    console.log("hello!")
}

class Carousel {
    slide = 0
    width = 80
    buttons
    recentInteract = false
    constructor(carouselHTML) {
        this.dom = carouselHTML
    }
    get items() {
        return this.dom.getElementsByClassName("carousel_list")[0]
    }
    get itemCount() {
        return this.items.childElementCount
    }
    get buttonList() {
        let output = []
        for (let listItem of this.buttons.children) {
            output.push(listItem.firstChild)
        }
        return output
    }
    init() {
        const newButtons = document.createElement("ul")
        newButtons.classList.add("carousel_buttons")
        for (let i = 0; i < this.itemCount; i++) {
            newButtons.insertAdjacentHTML("beforeend", "<li><button></button></li>")
        }
        this.dom.appendChild(newButtons)
        this.buttons = newButtons

        for (let [index, button] of this.buttonList.entries()) {
            button.addEventListener("click", () => {
                this.transition(index)
                this.recentInteract = true
                })
        }

        setInterval(() => {
            if (this.recentInteract) {
                this.recentInteract = false
            } else {
                this.cycle()  
            }
        }, 5000);

        this.transition(0)
    }
    cycle() {
        this.transition((this.slide + 1) % this.itemCount)
    }
    transition (slide) {
        this.slide = slide
        const newOffset = `-${slide*this.width}px`
        this.items.style.left = newOffset

        for (let button of this.buttonList) {
            button.classList.remove("active")
        }
        this.buttonList[slide].classList.add("active")
    }
}

let carousels = document.getElementsByClassName("carousel")
carousels = Array.from(carousels)
carousels = carousels.map(x => new Carousel(x))
for (carousel of carousels) {
    carousel.init()
}