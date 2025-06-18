import { validateBookInput } from './utils/validaotor';
import { BookService } from './services/bookService';
import { BookUI } from './UI/BookUI';

const bookService = new BookService();
const bookUI = new BookUI(bookService);

bookUI.bindEvents({
  onFormSubmit: (book) => {
    const validationErrors = validateBookInput(book);

  if (validationErrors) {
    alert(validationErrors); // or show in UI instead of alert
    return;
  }
    bookService.addManualBook(book);
    bookUI.renderBooks();
  },
  onEdit: (isbn) => {
    const book = bookService.getBooks().find((b) => b.isbn === isbn);
    if (book) bookUI.populateEditForm(book);
  },
  onDelete: (isbn) => {
    const books = bookService.getBooks();
    const index = books.findIndex((b) => b.isbn === isbn);
    if (index !== -1) {
      books.splice(index, 1);
      bookUI.renderBooks();
    }
  },
  onFilter: () => bookUI.renderBooks(),
  onSortAsc: () => {
    const books = bookService.getBooks();
    books.sort((a, b) => a.title.localeCompare(b.title));
    bookUI.renderBooks();
  },
  onSortDesc: () => {
    const books = bookService.getBooks();
    books.sort((a, b) => b.title.localeCompare(a.title));
    bookUI.renderBooks();
  },
});

// Fetch books from API and render
bookService.fetchBooksFromAPI().then(() => {
  bookUI.renderBooks();
});
