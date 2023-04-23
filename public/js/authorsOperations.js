import { showAlert } from './fun.js';

const modalCreateButton = document.getElementById('modalCreateButton');
const createAuthorButton = document.getElementById('createAuthorButton');
const updateAuthorButton = document.getElementById('updateAuthorButton');
const modalTitle = document.getElementById('authorModalTitle');
const name = document.getElementById('name');
const surname = document.getElementById('surname');

modalCreateButton.onclick = function() {
    name.value = null;
    surname.value = null;
    updateAuthorButton.hidden = true;
    createAuthorButton.hidden = false;
    modalTitle.innerHTML = 'Dodaj autora';
}

function updateModal(updateName, updateSurname, id) {
    name.value = updateName;
    surname.value = updateSurname;
    updateAuthorButton.value = id;
    createAuthorButton.hidden = true;
    updateAuthorButton.hidden = false;
    modalTitle.innerHTML = 'Edytuj autora';
}

function finishedOperation(data) {
    showAlert(data.statusCode);
    fetchAuthors();
}

function fetchAuthors() {
    $.ajax({
        url: 'http://localhost:8000/authors/fetch/',
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $('#authorsTable tbody').html('');
            data.authors.forEach(author => {
                $('#authorsTable tbody').append(`
                    <tr>
                        <td>${author.name}</td>
                        <td>${author.surname}</td>
                        <td>
                            <div>
                                <button 
                                    type="button" 
                                    class="btn btn-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#authorModalTarget" 
                                    id="update${author._id}">
                                    Edytuj
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn-danger" 
                                    value="Usuń" 
                                    id="delete${author._id}">
                                    Usuń
                                </button>
                            </div>
                        </td>
                    </tr>
                `);
                document.getElementById(`update${author._id}`).onclick = function() { updateModal(author.name, author.surname, author._id); }
                document.getElementById(`delete${author._id}`).onclick = function() { deleteAuthor(author._id); }
            });
        },
        error: function(data) {
            showAlert(data.statusCode);
        }
    });
}

function deleteAuthor(id) {
    $.ajax({
        url: `http://localhost:8000/authors/delete/${id}`,
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

updateAuthorButton.onclick = function() {
    $.ajax({
        url: `http://localhost:8000/authors/update/${updateAuthorButton.value}`,
        data: { 
            name: name.value, 
            surname: surname.value 
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

createAuthorButton.onclick = function() {
    $.ajax({
        url: 'http://localhost:8000/authors/create/',
        data: { 
            name: name.value, 
            surname: surname.value 
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
    fetchAuthors();
});