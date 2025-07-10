import { ManualBookInput } from './manualBook';

export interface BookUI {
  bindEvents(callbacks: {
    onFormSubmit: (book: ManualBookInput) => void;
    onEdit: (isbn: string) => void;
    onDelete: (isbn: string) => void;
    onFilter: () => void;
    onSortAsc: () => void;
    onSortDesc: () => void;
  }): void;
  renderBooks(): void;
  populateEditForm(book: ManualBookInput): void;
}
