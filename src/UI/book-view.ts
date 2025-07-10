import { BookUI } from '../interfaces/bookUi.js';
import { ManualBookInput } from '../interfaces/manualBook.js';
import { BookService } from '../services/book-service.js';

export class BookView implements BookUI {
  constructor(private bookService: BookService) {}

bindEvents(callbacks: {
  onFormSubmit: (book: ManualBookInput) => void;
  onEdit: (isbn: string) => void;
  onDelete: (isbn: string) => void;
  onFilter: () => void;
  onSortAsc: () => void;
  onSortDesc: () => void;
}): void {
  const $ = (id: string) => document.getElementById(id);

  const form = $('formField') as HTMLFormElement;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newBook: ManualBookInput = {
      title: formData.get('title')?.toString().trim() || '',
      author: formData.get('author')?.toString().trim() || '',
      isbn: formData.get('isbn')?.toString().trim() || '',
      publication_date: formData.get('publication_date')?.toString() || '',
      genre: formData.get('genre')?.toString() || '',
    };
    callbacks.onFormSubmit(newBook);
    form.reset();
  });

  $('searchBtn')?.addEventListener('click', callbacks.onFilter);
  $('genreFilter')?.addEventListener('change', callbacks.onFilter);
  $('sortAscButton')?.addEventListener('click', callbacks.onSortAsc);
  $('sortDescButton')?.addEventListener('click', callbacks.onSortDesc);

  $('bookTableBody')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const isbn = target.closest('button')?.getAttribute('data-isbn');
    if (!isbn) return;

    if (target.classList.contains('edit-btn')) callbacks.onEdit(isbn);
    else if (target.classList.contains('delete-btn')) callbacks.onDelete(isbn);
  });
}

renderBooks(): void {
  const $ = (id: string) => document.getElementById(id);

  const books = this.bookService.getBooks();
  const body = $('bookTableBody') as HTMLTableSectionElement;
  const search = ($('searchID') as HTMLInputElement).value.toLowerCase();
  const genreFilter = ($('genreFilter') as HTMLSelectElement).value;

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


  populateEditForm(book: ManualBookInput): void {
    const fields = {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publication_date: book.publication_date,
        genre: book.genre
    };

    Object.keys(fields).forEach(id => {
        const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
        if (element) {
            element.value = fields[id as keyof typeof fields];
        }
    });
}
}
