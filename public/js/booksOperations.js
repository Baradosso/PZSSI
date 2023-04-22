const editBooksButtons = document.getElementsByClassName('editBookButton');
const addBookButton = document.getElementById('addBookButton');

for (const bookButton of editBooksButtons) {
    bookButton.addEventListener('click', function() {
        const bookId = bookButton.value;
        document.getElementById('postBookTitle').value = document.getElementById(`title${bookId}`).value;
        document.getElementById('postBookAuthor').value = document.getElementById(`author${bookId}`).value;
        document.getElementById('postBookForm').action = `/books/update/${bookId}`;
        document.getElementById('postBookModalTitle').innerHTML = 'Edytuj książkę';
        document.getElementById('postBookSubmit').value = 'Edytuj';
    });
}

addBookButton.addEventListener('click', function() {
    document.getElementById('postBookTitle').value = null;
    document.getElementById('postBookAuthor').value = null;
    document.getElementById('postBookForm').action = '/books/create/';
    document.getElementById('postBookModalTitle').innerHTML = 'Dodaj książkę';
    document.getElementById('postBookSubmit').value = 'Dodaj';
});