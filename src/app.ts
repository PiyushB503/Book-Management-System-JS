import { BookService } from './services/book-service.js';
import { BookApiService } from './services/book-api.service.js';
import { BookView } from './UI/book-view.js';
import { ManualBookService } from './services/book-manual.service.js';
import { BookValidator } from './services/book-validator.js';

const bookService = new BookService();
const bookApiService = new BookApiService();
const manualBookManager = new ManualBookService();
const bookView = new BookView(bookService);
const bookValidator = new BookValidator();

// Bind UI events
bookView.bindEvents({
  onFormSubmit: (bookInput) => {
     const errors = bookValidator.validate(bookInput);
    if (errors.length > 0) {
      alert(errors.join('\n')); // or display in the DOM
      return;
    }
     const manualBook = manualBookManager.createManualBook(bookInput);
    bookService.addBook(manualBook);
    bookView.renderBooks();
  },

  onEdit: (isbn) => {
    const book = bookService.getBooks().find((b) => b.isbn === isbn);
    if (book) bookView.populateEditForm(book);
  },

   onDelete: (isbn) => {
    bookService.deleteBookByIsbn(isbn);
    bookView.renderBooks();
  },

  onFilter: () => bookView.renderBooks(),

  onSortAsc: () => {
    const books = bookService.getBooks();
    books.sort((a, b) => a.author.localeCompare(b.author));
    bookView.renderBooks();
  },
  
  onSortDesc: () => {
    const books = bookService.getBooks();
    books.sort((a, b) => b.author.localeCompare(a.author));
    bookView.renderBooks();
  },
});

//Fetch books and render
bookApiService.fetchBooksFromAPI().then((apiBooks) => {
  console.log("Fetched books:", apiBooks);

  bookService.addBooksFromApi(apiBooks);
  console.log("All books in service:", bookService.getBooks()); 

  bookView.renderBooks(); // 
});
