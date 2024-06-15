//the library box
const myLibrary = [];

//book creator
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//take new book info, put in library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

//show library on page
function displayLibrary() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = '';

    //creates each thing in myLibrary then appends
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        bookCard.innerHTML = `
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="remove-btn">Remove</button>
            <button class="toggle-read-btn">Toggle Read</button>
            `;

        libraryContainer.appendChild(bookCard);    
    });

    //remove button
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.parentElement.getAttribute('data-index');
            removeBook(index);
        });
    });

    //toggle read button
    document.querySelectorAll('.toggle-read-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.parentElement.getAttribute('data-index');
            toggleReadStatus(index);
        });
    }); 
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayLibrary();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('form-container').style.display = 'block';
});

document.getElementById('new-book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayLibrary();

    document.getElementById('new-book-form').reset();
    document.getElementById('form-container').style.display = 'none';
});

addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
displayLibrary();