const taskTemplate = /*html*/`
    <article class="task">
        <div class="header">
            <h3 contenteditable="true">Task</h3>
            <div class="buttons">
                <button onclick="toggleParentStyle(this, '.task', 'done')">Toggle Done</button>
                <button onclick="toggleParentStyle(this, '.task', 'important')">Toggle Important</button>
                <button onclick="removeParent(this, '.task')">Delete</button>
            </div>
        </div>
        <p contenteditable="true">Description</p>
    </article>`

const newTaskTemplate = /*html*/`<button onclick="addTask(this)">Add new task</button>`

const newProjectTemplate = /*html*/`<button onclick="addProject(this)">+</button>`

function generateProject() {
    let output = /*html*/`
        <section class="project">
            <div class="header">
                <h2 contenteditable="true">Project</h2>
                <div class="buttons">
                    <button onclick="toggleParentStyle(this, '.project', 'done')">Toggle Done</button>
                    <button onclick="toggleParentStyle(this, '.project', 'important')">Toggle Important</button>
                    <button onclick="removeParent(this, '.project')">Delete</button>
                </div>
            </div>
            ${taskTemplate}
            ${newTaskTemplate}
        </section >`
    return output
}

function addTask(element) {
    element.insertAdjacentHTML("beforeBegin", taskTemplate)
    save()
}

function addProject(element) {
    element.insertAdjacentHTML("beforeBegin", generateProject())
    save()
}

function removeParent(element, container) {
    toggleParentStyle(element, container, "removed")
    setTimeout(function () { element.closest(container).remove() }, 1000)
    save()
}

function toggleParentStyle(element, container, style) {
    element.closest(container).classList.toggle(style)
    save()
}

const main = document.getElementById("main")

if (localStorage.getItem("state")) {
    main.innerHTML = localStorage.getItem("state")
    const removed = document.getElementsByClassName("removed")
    for (item of removed) {
        item.remove()
    }
}

function save() {
    localStorage.setItem("state", main.innerHTML)
}