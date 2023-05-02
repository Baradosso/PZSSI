# PZSSI
# Programowanie zdarzeniowe skalowanych systemów internetowych Node.js

After downloading project instal Node packages:
```
npm install
```

Project runs on port _8000_ 

### Swagger-UI API _[localhost:8000/api-docs](localhost:8000/api-docs)_ 
### Graphql API _[localhost:8000/graphql](localhost:8000/graphql)_

## Author Graphql commends: 

- create author:
```
mutation {
  createAuthor(author: {
    name: "Sergiej",
    surname: "Łysy"
  }) {
    id,
    name,
    surname
  }
}
```

- delete author:
```
mutation {
  deleteAuthor(id: "6443e9e0d8c82a5fc4fe0ef6")
}
```
 
- update author:
```
mutation {
  updateAuthor(id: "6443e9e0d8c82a5fc4fe0ef6", author:{
    name: "Darmin"
  }) {
  	id,
    name,
    surname
  }
}
```

- get all authors:
```
query {
  getAuthors {
    id,
    name,
    surname
  }
}
```

- get author by id:
```
query {
  getAuthor(id: "6443e9e0d8c82a5fc4fe0ef6") {
    id,
    name,
    surname
  }
}
```

- get author by book:
```
query {
  getAuthorByBook(id: "6443f5feb7ad6ec02ed12b6c") {
    id,
    name,
    surname
  }
}
```

## Book Graphql commends: 

- create book:
```
mutation {
  createBook(book: "Metro 2036", 
    authorId: "6443f3fb77f85876025e22a0") {
    id,
    title,
    author {
      id,
      name,
      surname
    }
  }
}
```

- delete book:
```
mutation {
  deleteBook(id: "6443f4fc2f31f610b814965e")
}
```

- update book:
```
mutation {
  updateBook(id: "6443f4f4fbaa070e2e1bedcf", book: "Metro Exodus") {
    id,
    title,
    author {
      id,
      name,
      surname
    }
  }
}
```

- get all books:
```
query {
  getBooks {
    id,
    title,
    author {
      id,
      name,
      surname
    }
  }
}
```

- get book by id:
```
query {
  getBook(id: "6443f41f77f85876025e22a8") {
    id,
    title,
    author {
      id,
      name,
      surname
    }
  }
}
```

- get book by author:
```
query {
  getBooksByAuthor (id: "6443f3fb77f85876025e22a0") {
    id,
    title,
    author {
      id,
      name,
      surname
    }
  }
}
```
