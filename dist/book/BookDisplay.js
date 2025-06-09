import { filterItems } from "../utils/utils.js";
export function displayBooks(book) {
    const body = document.getElementById("bookTableBody");
    const search = document.getElementById("searchID").value.toLowerCase();
    const genreFilter = document.getElementById("genreFilter").value;
    body.innerHTML = "";
    const filtered = filterItems(book, (book) => (genreFilter === "all" ||
        book.genre.toLowerCase().includes(genreFilter.toLowerCase())) &&
        (book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search) ||
            book.isbn.toLowerCase().includes(search)));
    if (filtered.length === 0) {
        body.innerHTML = `<tr><td colspan="9" class="text-center py-4">No books found</td></tr>`;
        return;
    }
    filtered.forEach((book) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-5 py-3">${book.title}</td>
            <td class="px-5 py-3">${book.author}</td>
            <td class="px-5 py-3">${book.isbn}</td>
            <td class="px-5 py-3">${book.publication_date}</td>
            <td class="px-5 py-3">${book.genre}</td>
            <td class="px-5 py-3">${book.getAge()}</td>
            <td class="px-5 py-3">${book.price}</td>
            <td class="px-5 py-3">${book.getDiscountedPrice()}</td>
            <td class="px-5 py-3 space-x-2">
               <button class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" 
               data-isbn="${book.isbn}">Edit</button>
              <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
               data-isbn="${book.isbn}">Delete</button>
      </td>
            `;
        body.appendChild(row);
    });
}
