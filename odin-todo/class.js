class todo {
    constructor(title = "", projectRef) {
        this.title = title
        this.projectRef = projectRef
        this.description = ""
        this.dueDate = 0
        this.important = false
        this.urgent = false
        this.done = false
    }
    set title(newTitle) {
        title = newTitle
    }
    set description(newDescription) {
        description = newDescription
        if (description) {
            //show description
        } else {
            //hide description
        }
    }
    set dueDate(newDueDate) {
        dueDate = newDueDate
        if (dueDate) {
            //show description
        } else {
            //hide description
        }
    }
    importantToggle() {
        important = !important
        this.evaluateEisenhower()
    }
    urgentToggle() {
        urgent = !urgent
        this.evaluateEisenhower()
    }
    evaluateEisenhower() {
        if (important && urgent) {
            //Do style
        } else if (important && !urgent) {
            //Schedule style
        } else if (!important && urgent) {
            //Delegate style
        } else {
            //Delete style
        }
    }
    taskToggle() {
        done = !done
        if (done) {
            //complete the task
        } else {
            //uncomplete the task
        }
    }
}

class project {
    constructor(name) {
        this.name = name
        this.todos = []
    }
    set name(newName) {
        name = newName
    }
}