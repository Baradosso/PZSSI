const editAuthorsButtons = document.getElementsByClassName('editAuthorButton');
const addAuthorButton = document.getElementById('addAuthorButton');

for (const authorButton of editAuthorsButtons) {
    authorButton.addEventListener('click', function handleClick() {
        const authorId = authorButton.value;
        document.getElementById('postAuthorName').value = document.getElementById(`name${authorId}`).value;
        document.getElementById('postAuthorSurname').value = document.getElementById(`surname${authorId}`).value;
        document.getElementById('postAuthorForm').action = `/authors/update/${authorId}`;
        document.getElementById('postAuthorModalTitle').innerHTML = 'Edytuj autora';
        document.getElementById('postAuthorSubmit').value = 'Edytuj';
    });
}

addAuthorButton.addEventListener('click', function handleClick() {
    document.getElementById('postAuthorName').value = null;
    document.getElementById('postAuthorSurname').value = null;
    document.getElementById('postAuthorForm').action = '/authors/create/';
    document.getElementById('postAuthorModalTitle').innerHTML = 'Dodaj autora';
    document.getElementById('postAuthorSubmit').value = 'Dodaj';
});