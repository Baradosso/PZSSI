import '../bootstrap/dist/js/bootstrap.js'

const tableAnchors = document.getElementsByClassName('edit-book-btn');

for (const anchor of tableAnchors) {
    anchor.addEventListener('click', function handleClick() {
        const anchorId = anchor.value;
        document.getElementById('editBookTitle').value = document.getElementById("title" + anchorId).value;
        document.getElementById('editBookAuthor').value = document.getElementById("author" + anchorId).value;
        document.getElementById('editBookId').value = anchorId;
    });
}