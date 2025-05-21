
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const bookList = document.getElementById("bookList");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const isbn = document.getElementById("isbn").value.trim();
        const pubDate = document.getElementById("pub_date").value;
        const genre = document.getElementById("genre").value.trim();

        if (title === "" || author === "" || isbn === "" || pubDate === "" || genre === "") {
            alert("Please fill out all fields.");
            return;
        }

        const newRow = bookList.insertRow();

        // Insert cells with the book data
        newRow.insertCell(0).textContent = title;
        newRow.insertCell(1).textContent = author;
        newRow.insertCell(2).textContent = isbn;
        newRow.insertCell(3).textContent = pubDate;
        newRow.insertCell(4).textContent = genre;

        form.reset();
    });
});
