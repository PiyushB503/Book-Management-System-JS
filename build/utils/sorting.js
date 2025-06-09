"use strict";
// import { IBook } from "../interfaces/interface";
// import { filterBooks } from "../utils/filter";
// function createTableRow(book: IBook): HTMLTableRowElement {
//   const row = document.createElement("tr");
//   // Define column names and their corresponding book properties
//   const columns: Array<{ label: string; value: string | number }> = [
//     { label: "Title", value: book.title },
//     { label: "Author", value: book.author },
//     { label: "ISBN", value: book.isbn },
//     { label: "Publication Date", value: book.publicationDate },
//     { label: "Genre", value: book.genre },
//     { label: "Age", value: book.getAge() },
//     { label: "Price", value: book.price },
//     { label: "Discounted Price", value: book.getDiscountedPrice() },
//   ];
//   // Append data cells to the row
//   columns.forEach((col) => {
//     const cell = document.createElement("td");
//     cell.classList.add("px-5", "py-3");
//     cell.textContent = String(col.value);
//     row.appendChild(cell);
//   });
//   // Append action buttons cell
//   const actionCell = document.createElement("td");
//   actionCell.classList.add("px-5", "py-3", "space-x-2");
//   actionCell.innerHTML = `
//     <button class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" data-isbn="${book.isbn}">Edit</button>
//     <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" data-isbn="${book.isbn}">Delete</button>
//   `;
//   row.appendChild(actionCell);
//   return row;
// }
// export function displayBooks(books: IBook[]): void {
//   const searchQuery = (
//     document.getElementById("searchID") as HTMLInputElement
//   ).value.toLowerCase();
//   const genreFilter = (
//     document.getElementById("genreFilter") as HTMLSelectElement
//   ).value;
//   const filteredBooks = filterBooks(books, searchQuery, genreFilter);
//   const body = document.getElementById(
//     "bookTableBody"
//   ) as HTMLTableSectionElement;
//   body.innerHTML = "";
//   if (filteredBooks.length === 0) {
//     body.innerHTML = `<tr><td colspan="9" class="text-center py-4">No books found</td></tr>`;
//     return;
//   }
//   filteredBooks.forEach((book) => {
//     const row = createTableRow(book);
//     body.appendChild(row);
//   });
// }
