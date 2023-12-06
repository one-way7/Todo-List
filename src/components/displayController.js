import ProjectsController from './projectsController';
import { format, differenceInDays, startOfDay } from 'date-fns';

class DisplayController {
    #projectsContainer = document.querySelector('.projects_wrapper');
    #toDosContainer = document.querySelector('.toDos_wrapper');
    #projectForm = document.querySelector('.project_form');
    #headerContent = document.querySelector('.h3');
    #overlayDiv = document.querySelector('#overlay');
    #mainHeader = document.querySelector('.h1');
    #homeContainer = document.querySelector('.nav');
    #toDoForm = document.querySelector('.toDo_form');
    #newTaskBtn = document.querySelector('.new_task');
    #projectsController = new ProjectsController();
    #activeProject = this.#projectsController.getActiveProject(0);
    #activeProjectElemId = 0;
    #toDosObj = [];
    #todosObjFiltred = this.#toDosObj;

    constructor() {}

    renderProjects = () => {
        this.#projectsContainer.textContent = '';

        this.#projectsController.getProjects().forEach((project, i) => {
            const projectElem = document.createElement('div');
            const isRenderDeleteIcon = i === 0 ? '' : 'delete';
            projectElem.classList.add('project_block');

            if (this.#activeProjectElemId == i) {
                projectElem.classList.add('focus');
            }

            projectElem.setAttribute('data-id', i);
            projectElem.innerHTML = `
                <img 
                    src="./assets/icons/project-icon.png"
                    alt="icon"
                    width="45"
                    height="45" 
                />
                <span class="project_name">${project.getTitle()}</span>
                <span class="material-symbols-rounded delete_icon">
                    ${isRenderDeleteIcon}
                </span>
            `;

            this.#projectsContainer.insertAdjacentElement(
                'beforeend',
                projectElem,
            );
        });
    };

    #renderToDos = () => {
        this.#toDosContainer.textContent = '';

        if (+this.#todosObjFiltred.length === 0) {
            this.#showHeaderContent();
        } else {
            this.#hideHeaderContent();
        }

        this.#todosObjFiltred.forEach((toDo, i) => {
            const { title, description, date, isImportant, isDone } =
                toDo.getToDoInfo();
            const formatDate = format(date, 'dd MMMM yyyy');

            const doneBtnContent = isDone ? 'Done' : 'Mark as done';
            const doneBtnClass = isDone ? 'done_btn' : '';
            const importantBtnContent = isImportant
                ? 'Important!'
                : 'Mark as Important';
            const importantBtnClass = isImportant ? 'important' : '';
            const toDoElem = document.createElement('div');
            toDoElem.classList.add('toDo_card');

            toDoElem.setAttribute('data-toDo-id', i);

            toDoElem.innerHTML = `
                    <div class="toDo_card-content">
                        <div class="toDo_title">${title}</div>
                        <div class="toDo_descr">${description}</div>
                        <div class="toDo_date">${formatDate}</div>
                        <div class="card_buttons">
                            <button class="button_status ${doneBtnClass}">
                                ${doneBtnContent}
                            </button>
                            <button class="button_important ${importantBtnClass}">${importantBtnContent}</button>
                        </div>
                    </div>
                    <div class="toDo_card-settings">
                        <span class="material-symbols-rounded delete_card-icon">
                            delete
                        </span>
                    </div>
                `;

            this.#toDosContainer.insertAdjacentElement('afterbegin', toDoElem);
        });
    };

    #renderActiveProjectToDos = () => {
        this.#toDosObj = this.#activeProject.getToDos();
        this.#todosObjFiltred = this.#toDosObj;
        this.#renderToDos();
    };

    #renderAllTasksTabToDos = () => {
        this.#toDosObj = this.#projectsController
            .getProjects()
            .map((project) => project.getToDos())
            .flat();
        this.#todosObjFiltred = this.#toDosObj;
        this.#renderToDos();
    };

    #renderImportantTasks = () => {
        this.#toDosObj = this.#getAllTasks();

        this.#todosObjFiltred = this.#toDosObj.filter((toDo) => {
            return toDo.getImportantStatus();
        });

        this.#renderToDos();
    };

    #renderTodayTasks = () => {
        this.#toDosObj = this.#getAllTasks();

        this.#todosObjFiltred = this.#toDosObj.filter((toDo) => {
            const days = differenceInDays(
                startOfDay(toDo.getDate()),
                startOfDay(new Date()),
            );

            return days === 0;
        });

        this.#renderToDos();
    };

    #renderNextSevenDaysTasks = () => {
        this.#toDosObj = this.#getAllTasks();

        this.#todosObjFiltred = this.#toDosObj.filter((toDo) => {
            const days = differenceInDays(
                startOfDay(toDo.getDate()),
                startOfDay(new Date()),
            );

            return days > 0 && days < 8;
        });

        this.#renderToDos();
    };

    #getAllTasks = () => {
        return this.#projectsController
            .getProjects()
            .map((project) => project.getToDos())
            .flat();
    };

    #changeTextContentInsideHeader = (content) => {
        this.#mainHeader.textContent = content;
    };

    #addProjectToContainer = (title) => {
        this.#projectsController.addProject(title);
    };

    #displayElement = (elem) => {
        elem.classList.remove('hidden');
    };

    #hideElement = (elem) => {
        elem.classList.add('hidden');
    };

    #addFocusClassOnProjectElem = (elem) => {
        elem.classList.add('focus');
    };

    #removeFocusClassOnProjectElems = () => {
        const projectsElem = [...this.#projectsContainer.children];

        projectsElem.forEach((projectElem) => {
            projectElem.classList.remove('focus');
        });
    };

    #removeFocusClassOnHomeElems = () => {
        const homeFolderElems =
            this.#homeContainer.querySelectorAll('.folder_line');

        homeFolderElems.forEach((folder) => {
            folder.classList.remove('focus');
        });
    };

    #hideHeaderContent = () => {
        this.#hideElement(this.#headerContent);
    };

    #showHeaderContent = () => {
        this.#displayElement(this.#headerContent);
    };

    #setActiveProjectElem = (target) => {
        const projectElemId = target.getAttribute('data-id');
        this.#removeFocusClassOnHomeElems();
        this.#removeFocusClassOnProjectElems();
        this.#addFocusClassOnProjectElem(target);

        this.#activeProject =
            this.#projectsController.getActiveProject(projectElemId);
        this.#activeProjectElemId = projectElemId;

        this.#displayElement(this.#newTaskBtn);
        this.#changeTextContentInsideHeader(this.#activeProject.getTitle());
        this.#renderActiveProjectToDos();
    };

    #setActiveHomeElem = (e) => {
        this.#removeFocusClassOnProjectElems();
        this.#removeFocusClassOnHomeElems();
        this.#addFocusClassOnProjectElem(e.currentTarget);
        this.#hideElement(this.#newTaskBtn);
    };

    handleClickAddProject = () => {
        this.#displayElement(this.#projectForm);
    };

    handleSubmitAddProjectForm = (e) => {
        e.preventDefault();

        let titleName = document.querySelector('#title_input');

        if (titleName.value === '') return;

        this.#addProjectToContainer(titleName.value);
        this.renderProjects();
        this.#hideElement(this.#projectForm);

        titleName.value = '';
    };

    handleSubmitCancelProjectForm = (e) => {
        e.preventDefault();

        let titleName = document.querySelector('#title_input');

        this.#hideElement(this.#projectForm);
        titleName.value = '';
    };

    handleClickOnProject = (e) => {
        if (e.target.classList.contains('project_block')) {
            const target = e.target;

            this.#setActiveProjectElem(target);
        } else if (e.target.parentNode.classList.contains('project_block')) {
            const target = e.target.parentNode;

            this.#setActiveProjectElem(target);
        }
    };

    handleClickOnAllTasksTab = (e) => {
        this.#activeProjectElemId = 'allTasks';
        this.#changeTextContentInsideHeader('All Tasks');
        this.#setActiveHomeElem(e);
        this.#renderAllTasksTabToDos();
    };

    handleClickOnImportantTasksTab = (e) => {
        this.#activeProjectElemId = 'important';
        this.#changeTextContentInsideHeader('Important');
        this.#setActiveHomeElem(e);
        this.#renderImportantTasks();
    };

    handleClickTodayTasksTab = (e) => {
        this.#activeProjectElemId = 'today';
        this.#changeTextContentInsideHeader('Today');
        this.#setActiveHomeElem(e);
        this.#renderTodayTasks();
    };

    handleClickNextSevenDaysTasksTab = (e) => {
        this.#activeProjectElemId = 'nextSevenDays';
        this.#changeTextContentInsideHeader('Next 7 Days');
        this.#setActiveHomeElem(e);
        this.#renderNextSevenDaysTasks();
    };

    handleClickNewTaskButton = () => {
        this.#displayElement(this.#toDoForm);
        this.#displayElement(this.#overlayDiv);
    };

    handleClickCloseNewTaskForm = () => {
        this.#hideElement(this.#toDoForm);
        this.#hideElement(this.#overlayDiv);
        this.#toDoForm.reset();
    };

    handleSubmitNewTaskForm = (e) => {
        e.preventDefault();

        const formData = new FormData(this.#toDoForm);
        const { title, description, date } = Object.fromEntries(formData);

        this.#activeProject.addToDo(
            title,
            description,
            date,
            false,
            false,
            this.#activeProjectElemId,
        );
        this.#hideElement(this.#toDoForm);
        this.#hideElement(this.#overlayDiv);
        this.#hideHeaderContent();
        this.#renderActiveProjectToDos();
        e.target.reset();
    };

    handleClickDeleteProject = (e) => {
        if (e.target.classList.contains('delete_icon')) {
            const projectIndex = e.target.parentNode.getAttribute('data-id');
            if (+projectIndex === 0) return;
            this.#projectsController.deleteProject(projectIndex);

            if (this.#activeProjectElemId == projectIndex) {
                this.#activeProjectElemId -= 1;

                this.#activeProject = this.#projectsController.getActiveProject(
                    this.#activeProjectElemId,
                );
                this.#renderActiveProjectToDos();
                this.#changeTextContentInsideHeader(
                    this.#activeProject.getTitle(),
                );
            }

            this.renderProjects();
        }
    };

    handleClickDeleteToDo = (e) => {
        if (e.target.classList.contains('delete_card-icon')) {
            const toDoCardIndex = e.target
                .closest('.toDo_card')
                .getAttribute('data-todo-id');

            const toDoParentIndex =
                this.#todosObjFiltred[toDoCardIndex].getParentId();
            const toDoId = this.#todosObjFiltred[toDoCardIndex].getId();

            this.#projectsController.deleteToDoFromProject(
                toDoParentIndex,
                toDoId,
            );

            switch (this.#activeProjectElemId) {
                case 'allTasks':
                    this.#renderAllTasksTabToDos();
                    break;
                case 'important':
                    this.#renderImportantTasks();
                    break;
                case 'today':
                    this.#renderTodayTasks();
                    break;
                case 'nextSevenDays':
                    this.#renderNextSevenDaysTasks();
                    break;
                default:
                    this.#renderActiveProjectToDos();
            }
        }
    };

    handleClickMarkAsDone = (e) => {
        if (e.target.classList.contains('button_status')) {
            const toDoCardIndex = e.target
                .closest('.toDo_card')
                .getAttribute('data-todo-id');

            this.#todosObjFiltred[toDoCardIndex].changeDoneStatus();

            this.#renderToDos();
        }
    };

    handleClickMarkAsImportant = (e) => {
        if (e.target.classList.contains('button_important')) {
            const toDoCardIndex = e.target
                .closest('.toDo_card')
                .getAttribute('data-todo-id');

            this.#todosObjFiltred[toDoCardIndex].changeImportantStatus();

            if (this.#activeProjectElemId === 'important') {
                this.#renderImportantTasks();
            } else {
                this.#renderToDos();
            }
        }
    };

    init = () => {
        const newProjectLine = document.querySelector('.new-project_line');
        const addBtn = document.querySelector('.add_btn');
        const cancelBtn = document.querySelector('.cancel_btn');
        const projectsWrapper = document.querySelector('.projects_wrapper');
        const newTaskBtn = document.querySelector('.new_task');
        const formCloseBtn = document.querySelector('.form_close > span');
        const toDoForm = document.querySelector('.toDo_form');
        const toDosWrapper = document.querySelector('.toDos_wrapper');
        const allTasksFolder = document.querySelector(
            '[data-type="all_tasks"]',
        );
        const importantFolder = document.querySelector(
            '[data-type="important"]',
        );
        const todayFolder = document.querySelector('[data-type="today"]');
        const nextSevenDaysFolder = document.querySelector(
            '[data-type="next_seven_days"]',
        );

        this.renderProjects();

        newProjectLine.addEventListener('click', this.handleClickAddProject);
        addBtn.addEventListener('click', this.handleSubmitAddProjectForm);
        cancelBtn.addEventListener('click', this.handleSubmitCancelProjectForm);
        projectsWrapper.addEventListener('click', this.handleClickOnProject);
        newTaskBtn.addEventListener('click', this.handleClickNewTaskButton);
        formCloseBtn.addEventListener(
            'click',
            this.handleClickCloseNewTaskForm,
        );
        toDoForm.addEventListener('submit', this.handleSubmitNewTaskForm);
        projectsWrapper.addEventListener(
            'click',
            this.handleClickDeleteProject,
        );
        toDosWrapper.addEventListener('click', this.handleClickDeleteToDo);
        toDosWrapper.addEventListener('click', this.handleClickMarkAsDone);
        toDosWrapper.addEventListener('click', this.handleClickMarkAsImportant);
        allTasksFolder.addEventListener('click', this.handleClickOnAllTasksTab);
        importantFolder.addEventListener(
            'click',
            this.handleClickOnImportantTasksTab,
        );
        todayFolder.addEventListener('click', this.handleClickTodayTasksTab);
        nextSevenDaysFolder.addEventListener(
            'click',
            this.handleClickNextSevenDaysTasksTab,
        );
    };
}

export default DisplayController;
