import { IBookUI } from '../interfaces/IBookUI.js';
import { IManualBookInput } from '../interfaces/IManualBookInput.js';
import { BookService } from '../services/bookService.js';

export class BookUI implements IBookUI {
  constructor(private bookService: BookService) {}

  bindEvents(callbacks: {
    onFormSubmit: (book: IManualBookInput) => void;
    onEdit: (isbn: string) => void;
    onDelete: (isbn: string) => void;
    onFilter: () => void;
    onSortAsc: () => void;
    onSortDesc: () => void;
  }): void {
    const form = document.getElementById('formField') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newBook: IManualBookInput = {
        title: formData.get('title')?.toString().trim() || '',
        author: formData.get('author')?.toString().trim() || '',
        isbn: formData.get('isbn')?.toString().trim() || '',
        publication_date: formData.get('publication_date')?.toString() || '',
        genre: formData.get('genre')?.toString() || '',
      };
      callbacks.onFormSubmit(newBook);
      form.reset();
    });

    document.getElementById('searchBtn')?.addEventListener('click', callbacks.onFilter);
    document.getElementById('genreFilter')?.addEventListener('change', callbacks.onFilter);
    document.getElementById('sortAscButton')?.addEventListener('click', callbacks.onSortAsc);
    document.getElementById('sortDescButton')?.addEventListener('click', callbacks.onSortDesc);

    const table = document.getElementById('bookTableBody');
    table?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const isbn = target.closest('button')?.getAttribute('data-isbn');
      if (!isbn) return;
      if (target.classList.contains('edit-btn')) callbacks.onEdit(isbn);
      else if (target.classList.contains('delete-btn')) callbacks.onDelete(isbn);
    });
  }

  renderBooks(): void {
    const books = this.bookService.getBooks();
    const body = document.getElementById('bookTableBody') as HTMLTableSectionElement;
    const search = (document.getElementById('searchID') as HTMLInputElement).value.toLowerCase();
    const genreFilter = (document.getElementById('genreFilter') as HTMLSelectElement).value;

    body.innerHTML = '';

    const filtered = books.filter((book) =>
      (genreFilter === 'all' || book.genre.toLowerCase().includes(genreFilter.toLowerCase())) &&
      (book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search) ||
        book.isbn.toLowerCase().includes(search))
    );

    if (filtered.length === 0) {
      body.innerHTML = `<tr><td colspan="9" class="text-center py-4">No books found</td></tr>`;
      return;
    }

    filtered.forEach((book) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.publication_date}</td>
        <td>${book.genre}</td>
        <td>${book.getAge()}</td>
        <td>${book.price}</td>
        <td>${book.getDiscountedPrice()}</td>
        <td>
          <button class="edit-btn" data-isbn="${book.isbn}">Edit</button>
          <button class="delete-btn" data-isbn="${book.isbn}">Delete</button>
        </td>`;
      body.appendChild(row);
    });
  }

  populateEditForm(book: IManualBookInput): void {
    (document.getElementById('title') as HTMLInputElement).value = book.title;
    (document.getElementById('author') as HTMLInputElement).value = book.author;
    (document.getElementById('isbn') as HTMLInputElement).value = book.isbn;
    (document.getElementById('publication_date') as HTMLInputElement).value = book.publication_date;
    (document.getElementById('genre') as HTMLSelectElement).value = book.genre;
  }
}
