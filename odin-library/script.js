const addBookForm = document.querySelector('#addBook')
const addBookButton = addBookForm.querySelector('button')

class Book{
    constructor(formObject){
        this.title = formObject.title.toString();
        this.author = formObject.author.toString();
        this.pages = Number.parseInt(formObject.pages);
        this.read = formObject.read ? true : false;
        this.htmlObject = this.generateDOM();
        console.log(this.htmlObject)
    };
    toggleRead(){
        console.log(this)
        this.read = !this.read
        // this.htmlObject.querySelector('button.book-readbutton').innerHTML = `Read:${this.read?'☒':'☐'}`
        this.updateDOMfields()
        console.log(this)
    };
    delete(){
        this.htmlObject.remove();
    }
    generateDOM(){
        const newBookDOM = document.createElement('article')
        newBookDOM.classList.add('book')
        newBookDOM.innerHTML = 
            `<div class="book-title">${this.title}</div>
            <div class="book-author">by ${this.author}</div>
            <div class="book-pages">Pages: ${this.pages}</div>
            <div class="book-buttons">
                <button class="book-readButton">Read:${this.read?'☒':'☐'}</button>
                <button class="book-removeButton">🗑️</button>
                <button class="book-editButton">✏️</button>
            </div>`
        newBookDOM.id = 'book' + this.index;

        newBookDOM.querySelector('button.book-readButton').addEventListener('click', this.toggleRead.bind(this))
        newBookDOM.querySelector('button.book-removeButton').addEventListener('click', this.delete.bind(this))
        // newBookDOM.querySelector('button.book-editButton').addEventListener('click', (event) => {this.toggleRead})
        return newBookDOM;
    };
    updateDOMfields(){
        this.htmlObject.querySelector('.book-title').innerText = `${this.title}`
        this.htmlObject.querySelector('.book-author').innerText = `by ${this.author}`
        this.htmlObject.querySelector('.book-pages').innerText = `Pages: ${this.pages}`
        this.htmlObject.querySelector('.book-readButton').innerText = `Read:${this.read?'☒':'☐'}`
    }
};

class Library{
    constructor(htmlElement){
        this.htmlElement = htmlElement;
        this.books = [];
    };
    addBook(newBook){
        // records the index within the object, for usage as HTML hook.
        newBook.index = this.books.push(newBook)
        this.htmlElement.appendChild(newBook.htmlObject)
    };
    deleteBook(bookToDelete){
        return(this.books.splice(bookToDelete, 1))
    };
    updateDOM(bookToUpdate){
    };
};

function addBook(event){
    const bookForm = new FormData(addBookForm)
    const bookObject = Object.fromEntries(bookForm.entries())
    library.addBook(new Book(bookObject))
    addBookForm.reset();
};

const library = new Library(document.querySelector('#library'))

// addBookButton.addEventListener('onclick', (event) => {addBook()});
addBookButton.onclick = addBook;