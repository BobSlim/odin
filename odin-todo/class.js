const EISEN = {
    DO: 0,
    SCHEDULE: 1,
    DELEGATE: 2,
    DELETE: 3
}

class Task {
    constructor(title = "New Task", description = "Description") {
        this.title = title
        this.description = description
        this.dueDate = 0
        this.important = false
        this.urgent = false
        this.done = false
    }
    importantToggle() {
        this.important = !important
        this.evaluateEisenhower()
    }
    urgentToggle() {
        this.urgent = !urgent
        this.evaluateEisenhower()
    }
    evaluateEisenhower() {
        if (this.important && this.urgent) {
            //Do style
        } else if (this.important && !this.urgent) {
            //Schedule style
        } else if (!this.important && this.urgent) {
            //Delegate style
        } else {
            //Delete style
        }
    }
    taskToggle() {
        this.done = !this.done
        if (done) {
            //complete the task
        } else {
            //uncomplete the task
        }
    }
    construct() {
        return /*html*/`
        <article class="task">
            <h3>${this.title}</h3>
            <p>${this.description}</p>
        </article>
        `
    }
}

class Project {
    constructor(name = "New Project") {
        this.name = name
        this.todos = []
    }
    concatTodos() {
        let output = ""
        this.todos.forEach(element => {
            output += element.construct()
        })
        return output;
    }
    addTask() {
        this.todos.push(new Task())
        console.log("add tasks!")
    }
    construct() {
        return /*html*/`
        <section class="project">
            <h2>Project 1</h2>
            <div class="project_taskList">
                ${this.concatTodos()}
                <button onclick=${this.addTask()}>
                    Add new task
                </button>
            </div >
        </section >
            `
    }
}

class App {
    constructor() {
        this.projects = []
    }
    concatProjects() {
        let output = ""
        this.projects.forEach(element => {
            output += element.construct()
        })
        return output
    }
    addProject() {
        this.projects.push(new Project());
        console.log("new project!")
    }
    construct() {
        let construct = /*html*/`
            <h1> To Do List </h1>
                <main>
                    ${this.concatProjects()}
                    <button>+</button>
                </main>
        `
        return construct
    }
    render() {
        document.getElementById("body").innerHTML = this.construct()
    }
}

myApp = new App()
myApp.addProject()
myApp.projects[0].addTask()

myApp.render()