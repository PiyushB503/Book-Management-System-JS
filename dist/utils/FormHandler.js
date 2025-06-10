export function getFormInput(form) {
    const formData = new FormData(form);
    return {
        title: formData.get("title")?.toString().trim() || "",
        author: formData.get("author")?.toString().trim() || "",
        isbn: formData.get("isbn")?.toString().trim() || "",
        publication_date: formData.get("publication_date")?.toString() || "",
        genre: formData.get("genre")?.toString() || "",
    };
}
