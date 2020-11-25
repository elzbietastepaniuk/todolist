export class UI {
  UiSelectors = {
    addInput: `[data-addInput]`,
    addBtn: `[data-addBtn]`,
    searchInput: `[data-searchInput]`,
    deleteBtn: `[data-deleteBtn]`,
    filterBtn: `[data-filterList]`,
    listCount: `[data-listCount]`,
    listDone: `[data-listDone]`,
    listLeft: `[data-listLeft]`,
    searchInfo: `[data-searchInfo]`,
    list: `[data-list]`,
    checkbox: `[data-todo-checkbox]`,
    searchInfo: `[data-searchInfo]`,
  };

  getElement(element) {
    return document.querySelector(element);
  }
  getElements(element) {
    return document.querySelectorAll(element);
  }
}
