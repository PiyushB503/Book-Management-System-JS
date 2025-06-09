"use strict";
// import { IManualBookInput } from "../interfaces/interface";
// import { validateBookInput } from "../utils/validaotor";
// export function handleFormSubmit(event: Event): void {
//   event.preventDefault();
//   const form = event.target as HTMLFormElement;
//   const formData = new FormData(form);
//   const newBook: IManualBookInput = {
//     title: formData.get("title")?.toString().trim() || "",
//     author: formData.get("author")?.toString().trim() || "",
//     isbn: formData.get("isbn")?.toString().trim() || "",
//     publicationDate: formData.get("Publication_Date")?.toString() || "",
//     genre: formData.get("genre")?.toString() || ""
//   };
//   const errors = validateBookInput(newBook);
//   if (errors) {
//     alert(errors);
//     return;
//   }
//   this.addBook(newBook);
// }
