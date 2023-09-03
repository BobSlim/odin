function generateButton(text = "button", htmlClass = "", onclickFunction) {
    let output = document.createElement("button")
    if (htmlClass) {
        output.classList.add(htmlClass)
    }
    output.innerText = text
    output.onclick = onclickFunction
    return output;
}

class HtmlElement {
    elementType = "div"
    elementClass = ""
    childContainer
    constructor(title = "", description = "") {
        this.title = title
        this.description = description
    }

    construct() {
        let output = document.createElement(this.elementType)
        if (this.elementClass) {
            output.classList.add(this.elementClass)
        }
        output.insertAdjacentHTML(
            "afterbegin",
            /*html*/`
                <h3>${this.title}</h3>
                <p>${this.description}</p>
        `)
        childContainer = document.createElement("div")
        output.appendChild(childContainer)
        return output
    }

    addChild(newChild) {
        this.childContainer.insertAdjacentElement
    }
}

class Task extends HtmlElement {
    elementType = "article"
    elementClass = "task"
}

class Project extends HtmlElement {
    elementType = "section"
    elementClass = "project"
    update() {
        let output = document.createElement(this.elementType)
        if (this.elementClass) {
            output.classList.add(this.elementClass)
        }
        output.insertAdjacentHTML("afterbegin", /*html*/`
            <h2>${this.title}</h3>
            <p>${this.description}</p>
        `)
        output.appendChild(this.listChildren())
        this.dom = output
    }
    addChild() {
        const newChild = new Task("New Task", "Description")
        this.children.push(newChild)
        newChild.update()
        this.dom.appendChild(newChild.dom)
    }
    buttonAdd() {
        const that = this
        const addThing = () => {
            that.addChild()
        }
        let output = generateButton(
            "add new task",
            "addButton",
            addThing
        )
        return output
    }
    listChildren() {
        let output = document.createElement("div");
        output.classList.add(this.elementClass + "_childList");
        this.children.forEach(element => {
            output.appendChild(element.dom)
        })
        output.appendChild(this.buttonAdd())
        return output;
    }
}