import { UI } from './UI.js';
import { Task } from './Task.js';
import { CLASS_IS_HIDE } from './Classes.js';

class ToDoList extends UI {
  tasksList = [];
  isCompleted = [];
  toBeDone = [];
  searchList = [];
  btn = this.getElement(this.UiSelectors.addBtn);
  ul = this.getElement(this.UiSelectors.list);
  listCount = this.getElement(this.UiSelectors.listCount);
  listDone = this.getElement(this.UiSelectors.listDone);
  listLeft = this.getElement(this.UiSelectors.listLeft);
  deleteBtn = this.getElement(this.UiSelectors.deleteBtn);
  filterBtn = this.getElement(this.UiSelectors.filterBtn);
  searchInput = this.getElement(this.UiSelectors.searchInput);
  searchInfo = this.getElement(this.UiSelectors.searchInfo);
  checkbox = this.getElement(this.UiSelectors.checkbox);

  setTodoList() {
    this.addTask();
    this.deleteAllTasks();
    this.filterToDoList();
    this.toggleVisibleElem();
    this.searchToDoList();
    this.getApi('../tasks.json');
  }

  getApi(url) {
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((out) => {
    //     let taskJson = out;
    //     console.log('JSON', taskJson);
    //     return taskJson;
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  }

  pushToApi(url, task) {
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((out) => {
    //     let taskJson = out;
    //     console.log('JSON', taskJson);
    //     return taskJson;
    //   })
    //   .catch((err) => {
    //     throw err;
    // });
  }

  toggleVisibleElem() {
    if (this.tasksList == 0) {
      this.deleteBtn.classList.add(CLASS_IS_HIDE);
      this.filterBtn.classList.add(CLASS_IS_HIDE);
      this.searchInput.classList.add(CLASS_IS_HIDE);
    } else {
      this.deleteBtn.classList.remove(CLASS_IS_HIDE);
      this.filterBtn.classList.remove(CLASS_IS_HIDE);
      this.searchInput.classList.remove(CLASS_IS_HIDE);
    }
  }

  setListIsCompleted() {
    this.isCompleted = this.tasksList.filter((task) => {
      return task.isCompleted == true;
    });
  }

  setTaskIsCopmlited(event, task, li) {
    if (event.target.checked) {
      task.isCompleted = true;
      li.dataset.iscompleted = true;
      this.setListIsCompleted();
      this.setTaskCounter();
    } else {
      task.isCompleted = false;
      li.dataset.iscompleted = false;
      this.setListIsCompleted();
      this.setTaskCounter();
    }
  }

  addTask() {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      const addInput = this.getElement(this.UiSelectors.addInput);
      const addInputValue = addInput.value;
      if (addInputValue === '') return;
      let task = new Task(addInputValue);
      this.tasksList.unshift(task);
      this.createList(this.tasksList);
      this.setTaskCounter();
      this.toggleVisibleElem();
      addInput.value = '';
      this.pushToApi(this.url);
    });
  }

  deleteTask(e) {
    e.target.parentNode.remove();
    let index = e.target.parentNode.dataset.taskid;
    this.tasksList.splice(index, 1);
    this.setListIsCompleted();
    this.createList(this.tasksList);
    this.setTaskCounter();
    if (this.tasksList.length < 1) {
      this.toggleVisibleElem();
    }
    this.searchInput.value = '';
  }

  deleteAllTasks() {
    this.deleteBtn.addEventListener('click', () => {
      this.searchInfo.textContent = '';
      this.searchInput.value = '';
      this.tasksList.splice(0, this.tasksList.length);
      this.createList(this.tasksList);
      this.setListIsCompleted();
      this.setTaskCounter();
      this.toggleVisibleElem();
    });
  }
  searchToDoList() {
    this.searchInput.addEventListener('input', () => {
      let searchText = this.searchInput.value.toLowerCase();
      this.searchList = this.tasksList.filter((task) =>
        task.taskContent.toLowerCase().includes(searchText)
      );
      if (this.searchList.length == 0) {
        this.searchInfo.textContent = 'Brak wyników';
      } else {
        this.searchInfo.textContent = '';
      }
      this.createList(this.searchList);
    });
  }

  filterToDoList() {
    this.filterBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchInfo.textContent = '';
      this.toBeDone = this.tasksList.filter((task) => {
        return task.isCompleted == false;
      });
      if (this.filterBtn.textContent === 'Show todo') {
        if (this.toBeDone.length > 0) {
          this.createList(this.toBeDone);
        } else {
          this.ul.textContent = '';
          this.searchInfo.textContent =
            'Już wszystko zrobione, możesz iść na piwo :)';
          // this.ul.textContent += 'Już wszystko zrobione, możesz iść na piwo :)';
        }
        this.filterBtn.textContent = 'Show all';
      } else {
        this.searchInfo.textContent = '';
        this.createList(this.tasksList);
        this.filterBtn.textContent = 'Show todo';
      }
    });
  }

  createList(arr) {
    this.ul.textContent = '';
    arr.forEach((task, index) => {
      task.taskId = index;
      let li = task.createTask(index);
      let doc = new DOMParser().parseFromString(li, 'text/html');
      li = doc.body.firstChild;
      this.ul.appendChild(li);
      if (task.isCompleted === true) {
        li.querySelector('[data-todo-checkbox]').checked = true;
      }
      li.querySelector('[data-todo-checkbox]').addEventListener(
        'change',
        (e) => {
          this.setTaskIsCopmlited(e, task, li);
        }
      );
      li.querySelector('[data-removetask]').addEventListener('click', (e) => {
        this.deleteTask(e);
      });
    });
  }

  stringToHTML(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.li;
  }

  setTaskCounter() {
    this.listCount.textContent = this.tasksList.length;
    this.listDone.textContent = this.isCompleted.length;
    this.listLeft.textContent = this.tasksList.length - this.isCompleted.length;
  }
}

const toDoList = new ToDoList();
toDoList.setTodoList();
