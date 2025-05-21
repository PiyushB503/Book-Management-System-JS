
  let books = [];

  const addBook = (title, author, isbn, publicationDate, genre) => {
    const newBook = { title, author, isbn, publicationDate, genre };
    books.unshift(newBook);
    displayBooks();
  };

    const fetchBooksFromAPI = () => {
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=genre:science+fiction+history+fantasy+mystery';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const fetchedBooks = data.items.map((item) => {
          const volumeInfo = item.volumeInfo;
          return {
            title: volumeInfo.title || 'N/A',
            author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A',
            isbn: volumeInfo.industryIdentifiers
              ? volumeInfo.industryIdentifiers[0].identifier
              : `API-${Math.random().toString(36).substr(2, 9)}`,
            publicationDate: volumeInfo.publishedDate || 'N/A',
            genre: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'N/A',
            isManual: false,
          };
        });
        books = books.concat(fetchedBooks);
        displayBooks();
      })
      .catch((error) => console.error('Error fetching books:', error));
  };

const calculateBookAge = (publicationDate) => {
  const currentYear = new Date().getFullYear();
  const publishedYear = new Date(publicationDate).getFullYear();
  const age = currentYear - publishedYear;
  return `${age} year${age !== 1 ? 's' : ''}`;
};
  const editBook = (isbn) => {
    const bookIndex = books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
      const book = books[bookIndex];
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('isbn').value = book.isbn;
      document.getElementById('Publication_Date').value = book.publicationDate;
      document.getElementById('genre').value = book.genre;
      books.splice(bookIndex, 1);
      displayBooks();
    }
  };

  const deleteBook = (isbn) => {
    books = books.filter(book => book.isbn !== isbn);
    displayBooks();
  };

  const displayBooks = () => {
    const tableBody = document.getElementById('bookTableBody');
    const selectedGenre = document.getElementById('genreFilter').value;
    const searchValue = document.getElementById("searchID").value;
    tableBody.innerHTML = '';

    const filteredBooks = books.filter((book) =>
      selectedGenre === "all" ? true : book.genre.toLowerCase().includes(selectedGenre.toLowerCase())
    );

    const searchBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      book.author.toLowerCase().includes(searchValue.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchValue.toLowerCase())
    );

    searchBooks.forEach((book) => {
      const bookAge = calculateBookAge(book.publicationDate);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.publicationDate}</td>
        <td>${book.genre}</td>
        <td>${bookAge}</td>
        <td>
          <button class="edit-btn" onclick="editBook('${book.isbn}')">Edit</button>
          <button class="delete-btn" onclick="deleteBook('${book.isbn}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    if (searchBooks.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='7'>No books found</td></tr>";
    }
  };



  document.addEventListener('DOMContentLoaded', () => {
    fetchBooksFromAPI();

    document.getElementById('genreFilter').addEventListener('change', displayBooks);
    document.getElementById('searchBtn').addEventListener('click', displayBooks);

    document.getElementById('sortAscButton').addEventListener('click', () => sortBooksByAuthor('asc'));
document.getElementById('sortDescButton').addEventListener('click', () => sortBooksByAuthor('desc'));


    const form = document.getElementById('formField');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value.trim();
      const author = document.getElementById('author').value.trim();
      const isbn = document.getElementById('isbn').value.trim();
      const publicationDate = document.getElementById('Publication_Date').value;
      const genre = document.getElementById('genre').value;

      let errorMsg = '';
      if (title == '' || author == '' || isbn == '' || publicationDate == '' || genre == '') {
        errorMsg += 'All fields are mandatory.\n';
      }

      if (isNaN(isbn) || (isbn.length != 13)) {
        errorMsg += 'ISBN must be a 13 Digit number.\n';
      }

      const today = new Date().toISOString().split('T')[0];
      if (publicationDate > today) {
        errorMsg += 'Publication Date cannot be in the future.\n';
      }

      if (errorMsg) {
        alert(errorMsg);
        return;
      }

      alert('Form submitted successfully!');
      addBook(title, author, isbn, publicationDate, genre);
      form.reset();
    });
  });

const sortBooksByAuthor = (order = 'asc') => {
    books.sort((a, b) => {
      const authorA = a.author.toLowerCase();
      const authorB = b.author.toLowerCase();
      if (authorA < authorB) {
        return -1;
      } else if (authorA > authorB) {
        return 1;
      } else {
        return 0;
      }
    });
    if (order === 'desc') {
      books.reverse();
    }
    displayBooks(); 
  };
  
  