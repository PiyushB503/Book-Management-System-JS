// Base Book Class
class Book {
  constructor(title, author, isbn, publicationDate, genre, isFavorite, price = 'Not for sale') {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publicationDate = publicationDate;
    this.genre = genre;
    this.isFavorite = isFavorite;
    this.price = price;
  }



  getAge() {
    const currentYear = new Date().getFullYear();
    const publishedYear = new Date(this.publicationDate).getFullYear();
    const age = currentYear - publishedYear;
    return `${age} year${age !== 1 ? 's' : ''}`;
  }

  getDiscountedPrice() {
  if (this.price === 'Not for sale' || isNaN(parseFloat(this.price))) {
    return 'N/A';
  }

  const yearsOld = new Date().getFullYear() - new Date(this.publicationDate).getFullYear();
  if (yearsOld >= 5) {
    // 20% discount
    const priceValue = parseFloat(this.price);
    const discounted = priceValue * 0.8;
    return `${discounted.toFixed(2)} ${this.price.split(' ')[1] || ''}`;
  }

  return 'No discount';
}
}

// ManualBook inherits from Book
class ManualBook extends Book {
  constructor(title, author, isbn, publicationDate, genre) {
    super(title, author, isbn, publicationDate, genre, true);
  }
}

class APIBook extends Book {
  constructor(volumeInfo) {
    const title = volumeInfo.title || 'N/A';
    const author = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A';
    const isbn = volumeInfo.industryIdentifiers
      ? volumeInfo.industryIdentifiers[0].identifier
      : `API-${Math.random().toString(36).substr(2, 9)}`;
    const publicationDate = volumeInfo.publishedDate || 'N/A';
    const genre = volumeInfo.categories ? volumeInfo.categories.join(', ') : 'N/A';
    const price = volumeInfo.price || 'Not for sale'; 

  
    super(title, author, isbn, publicationDate, genre, false, price);
  }
}

// Manager Class for Books
class BookManager {
  constructor() {
    this.books = [];
    document.addEventListener('DOMContentLoaded', () => this.initialize());
  }

  initialize() {
    this.fetchBooksFromAPI();
    document.getElementById('genreFilter').addEventListener('change', () => this.displayBooks());
    document.getElementById('searchBtn').addEventListener('click', () => this.displayBooks());
    document.getElementById('sortAscButton').addEventListener('click', () => this.sortBooksByAuthor('asc'));
    document.getElementById('sortDescButton').addEventListener('click', () => this.sortBooksByAuthor('desc'));
    document.getElementById('formField').addEventListener('submit', (event) => this.handleFormSubmit(event));
  }

  addBook(title, author, isbn, publicationDate, genre) {
    const newBook = new ManualBook(title, author, isbn, publicationDate, genre);
    this.books.unshift(newBook);
    this.displayBooks();
  }

fetchBooksFromAPI() {
  const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=genre:science+fiction+history+fantasy+mystery';
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const fetchedBooks = data.items.map(item => {
        const volumeInfo = item.volumeInfo;
        const saleInfo = item.saleInfo;

        let price = 'Not for sale';
        if (saleInfo && saleInfo.saleability === 'FOR_SALE' && saleInfo.listPrice) {
          price = `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`;
        }

        
        volumeInfo.price = price;

        return new APIBook(volumeInfo);
      });

      this.books = this.books.concat(fetchedBooks);
      this.displayBooks();
    })
    .catch(error => console.error('Error fetching books:', error));
}


  editBook(isbn) {
    const bookIndex = this.books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
      const book = this.books[bookIndex];
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('isbn').value = book.isbn;
      document.getElementById('Publication_Date').value = book.publicationDate;
      document.getElementById('genre').value = book.genre;
      this.books.splice(bookIndex, 1);
      this.displayBooks();
    }
  }

  deleteBook(isbn) {
    this.books = this.books.filter(book => book.isbn !== isbn);
    this.displayBooks();
  }

  displayBooks() {
    const tableBody = document.getElementById('bookTableBody');
    const selectedGenre = document.getElementById('genreFilter').value;
    const searchValue = document.getElementById("searchID").value.toLowerCase();
    tableBody.innerHTML = '';

    const filteredBooks = this.books.filter(book =>
      selectedGenre === "all" ? true : book.genre.toLowerCase().includes(selectedGenre.toLowerCase())
    );

    const searchBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.isbn.toLowerCase().includes(searchValue)
    );

    if (searchBooks.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='7'>No books found</td></tr>";
      return;
    }

    searchBooks.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.publicationDate}</td>
        <td>${book.genre}</td>
        <td>${book.getAge()}</td>
        <td>${(book.price)}</td>
         <td>${book.getDiscountedPrice()}</td>
        <td>
          <button class="edit-btn" onclick="bookApp.editBook('${book.isbn}')">Edit</button>
          <button class="delete-btn" onclick="bookApp.deleteBook('${book.isbn}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  sortBooksByAuthor(order = 'asc') {
    this.books.sort((a, b) => a.author.toLowerCase().localeCompare(b.author.toLowerCase()));
    if (order === 'desc') this.books.reverse();
    this.displayBooks();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const publicationDate = document.getElementById('Publication_Date').value;
    const genre = document.getElementById('genre').value;

    let errorMsg = '';
    if (!title || !author || !isbn || !publicationDate || !genre) {
      errorMsg += 'All fields are mandatory.\n';
    }

    if (isNaN(isbn) || isbn.length !== 13) {
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
    this.addBook(title, author, isbn, publicationDate, genre);
    document.getElementById('formField').reset();
  }
}

// Create global book manager instance
const bookApp = new BookManager();
