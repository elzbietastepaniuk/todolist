export class Task {
  constructor(taskContent, index, isCompleted) {
    this.taskContent = taskContent;
    this.isCompleted = false;
    this.taskId = index;
  }

  createTask(index) {
    const task = `<li data-isCompleted="${this.isCompleted}" data-taskId="${index}">
    <input type="checkbox" id="task${index}" data-todo-checkbox>
    <label for="task${index}">${this.taskContent}</label><span data-removetask>[×]</span></li>`;
    return task;
  }
}
