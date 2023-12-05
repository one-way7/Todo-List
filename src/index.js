import DisplayController from './components/displayController';

const displayController = new DisplayController();
displayController.renderProjects();
document
    .querySelector('.new-project_line')
    .addEventListener('click', displayController.handleClickAddProject);

document
    .querySelector('.add_btn')
    .addEventListener('click', displayController.handleSubmitAddProjectForm);

document
    .querySelector('.cancel_btn')
    .addEventListener('click', displayController.handleSubmitCancelProjectForm);

document
    .querySelector('.projects_wrapper')
    .addEventListener('click', displayController.handleClickOnProject);

document
    .querySelector('.new_task')
    .addEventListener('click', displayController.handleClickNewTaskButton);

document
    .querySelector('.form_close > span')
    .addEventListener('click', displayController.handleClickCloseNewTaskForm);

document
    .querySelector('.toDo_form')
    .addEventListener('submit', displayController.handleSubmitNewTaskForm);

document
    .querySelector('.projects_wrapper')
    .addEventListener('click', displayController.handleClickDeleteProject);

document
    .querySelector('.toDos_wrapper')
    .addEventListener('click', displayController.handleClickDeleteToDo);

document
    .querySelector('.toDos_wrapper')
    .addEventListener('click', displayController.handleClickMarkAsDone);

document
    .querySelector('.toDos_wrapper')
    .addEventListener('click', displayController.handleClickMarkAsImportant);

document
    .querySelector('[data-type="all_tasks"]')
    .addEventListener('click', displayController.handleClickOnAllTasksTab);
