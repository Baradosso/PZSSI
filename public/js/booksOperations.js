import { showAlert } from './fun.js';

const modalCreateButton = document.getElementById('modalCreateButton');
const createBookButton = document.getElementById('createBookButton');
const updateBookButton = document.getElementById('updateBookButton');
const modalTitle = document.getElementById('bookModalTitle');
const title = document.getElementById('title');
const author = document.getElementById('author');

modalCreateButton.onclick = function() {
    title.value = null;
    author.value = null;
    updateBookButton.hidden = true;
    createBookButton.hidden = false;
    modalTitle.innerHTML = 'Dodaj książkę';
}

function updateModal(id, updateTitle, authorId) {
    title.value = updateTitle;
    author.value = authorId;
    updateBookButton.value = id;
    createBookButton.hidden = true;
    updateBookButton.hidden = false;
    modalTitle.innerHTML = 'Edytuj książkę';
}

function finishedOperation(data) {
    showAlert(data.statusCode);
    fetchBooks();
}

function fetchBooks() {
    $.ajax({
        url: 'http://localhost:8000/books/fetch/',
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $('#booksTable tbody').html('');
            $('#author').html('');
            
            data.authors.forEach(author => {
                $('#author').append(`
                    <option value="${author._id}">${author.name} ${author.surname}</option>
                `);
            });

            data.books.forEach(book => {
                $('#booksTable tbody').append(`
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author.name} ${book.author.surname}</td>
                        <td>
                            <div>
                                <button 
                                    type="button" 
                                    class="btn btn-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#bookModalTarget" 
                                    id="update${book._id}">
                                    Edytuj
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn-danger" 
                                    value="Usuń" 
                                    id="delete${book._id}">
                                    Usuń
                                </button>
                            </div>
                        </td>
                    </tr>
                `);

                document.getElementById(`update${book._id}`).onclick = function() { updateModal(book._id, book.title, book.author._id); }
                document.getElementById(`delete${book._id}`).onclick = function() { deleteBook(book._id); }
            });
        },
        error: function(data) {
            showAlert(data.statusCode);
        }
    });
}

function deleteBook(id) {
    $.ajax({
        url: `http://localhost:8000/books/delete/${id}`,
        method: 'DELETE',
        dataType: 'JSON',
        success: function(data) {
            finishedOperation(data);
        },
        error: function(data) {
            finishedOperation(data);
        }
    });
}

updateBookButton.onclick = function() {
    $.ajax({
        url: `http://localhost:8000/books/update/${updateBookButton.value}`,
        data: { 
            title: title.value, 
            author: author.value 
        },
        method: 'PUT',
        dataType: 'JSON',
        success: function(data) {
            finishedOperation(data);
        },
        error: function(data) {
            finishedOperation(data);
        }
    });
}

createBookButton.onclick = function() {
    $.ajax({
        url: 'http://localhost:8000/books/create/',
        data: { 
            title: title.value, 
            author: author.value 
        },
        method: 'POST',
        dataType: 'JSON',
        success: function(data) {
            finishedOperation(data);
        },
        error: function(data) {
            finishedOperation(data);
        }
    });
}

$(function() {
    fetchBooks();
});