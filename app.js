let books = [];

const addBook = (title, author, isbn, publicationDate, genre) => {
  const newBook = { title, author, isbn, publicationDate, genre };
  books.unshift(newBook);
  displayBooks();
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
  tableBody.innerHTML = '';

  const filteredBooks = books.filter((book) =>
    selectedGenre === "all" ? true : book.genre.toLowerCase().includes(selectedGenre.toLowerCase())
  );

  filteredBooks.forEach((book) => {
    const bookAge = calculateBookAge(book.publicationDate) || "N/A";
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

  if (filteredBooks.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7'>No books found</td></tr>";
  }
};

document.getElementById('genreFilter').addEventListener('change', displayBooks);

const form = document.getElementById('formField');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const isbn = document.getElementById('isbn').value.trim();
  const publicationDate = document.getElementById('publication_date').value;
  const genre = document.getElementById('genre').value;

  let errorMsg = '';
  if (title === '' || author === '' || isbn === '' || publicationDate === '' || genre === '') {
    errorMsg += 'All fields are mandatory.\n';
  }

  alert('Form submitted successfully!');
  addBook(title, author, isbn, publicationDate, genre);
  form.reset();
});
