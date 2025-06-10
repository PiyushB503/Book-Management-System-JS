import { IManualBookInput } from './IManualBookInput';

export interface IBookUI {
  bindEvents(callbacks: {
    onFormSubmit: (book: IManualBookInput) => void;
    onEdit: (isbn: string) => void;
    onDelete: (isbn: string) => void;
    onFilter: () => void;
    onSortAsc: () => void;
    onSortDesc: () => void;
  }): void;
  renderBooks(): void;
  populateEditForm(book: IManualBookInput): void;
}
