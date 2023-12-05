import ProjectsController from './projectsController';

class DisplayController {
    #projectsContainer = document.querySelector('.projects_wrapper');
    #toDosContainer = document.querySelector('.toDos_wrapper');
    #projectForm = document.querySelector('.project_form');
    #headerContent = document.querySelector('.h3');
    #overlayDiv = document.querySelector('#overlay');
    #toDoForm = document.querySelector('.toDo_form');
    #projectsController = new ProjectsController();
    #activeProject = this.#projectsController.getActiveProject(0);
    #activeProjectElemId = 0;

    constructor() {}

    renderProjects = () => {
        this.#projectsContainer.textContent = '';

        this.#projectsController.getProjects().forEach((project, i) => {
            const projectElem = document.createElement('div');
            projectElem.classList.add('project_block');

            if (+this.#activeProjectElemId === i) {
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
                    delete
                </span>
            `;

            this.#projectsContainer.insertAdjacentElement(
                'beforeend',
                projectElem,
            );
        });
    };

    #renderActiveProjectToDos = (id) => {
        this.#toDosContainer.textContent = '';

        if (+this.#activeProject.getToDos().length === 0) {
            this.#showHeaderContent();
        } else {
            this.#hideHeaderContent();
        }

        this.#projectsController
            .getActiveProject(id)
            .getToDos()
            .forEach((toDo, i) => {
                const { title, description, date, isImportant, isDone } =
                    toDo.getToDoInfo();

                const doneBtnContent = isDone ? 'Done' : 'Mark as done';
                const doneBtnClass = isDone ? 'done_btn' : '';
                const toDoCardStatusClass = isDone ? 'done' : 's';
                const importantBtnContent = isImportant
                    ? 'Important!'
                    : 'Mark as Important';
                const importantBtnClass = isImportant ? 'important' : '';

                const toDoElem = document.createElement('div');
                toDoElem.classList.add('toDo_card', toDoCardStatusClass);
                toDoElem.setAttribute('data-toDo-id', i);

                toDoElem.innerHTML = `
                    <div class="toDo_card-content">
                        <div class="toDo_title">${title}</div>
                        <div class="toDo_descr">${description}</div>
                        <div class="toDo_date">${date}</div>
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

                this.#toDosContainer.insertAdjacentElement(
                    'afterbegin',
                    toDoElem,
                );
            });
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

    #hideHeaderContent = () => {
        this.#hideElement(this.#headerContent);
    };

    #showHeaderContent = () => {
        this.#displayElement(this.#headerContent);
    };

    #setActiveProjectElem = (target) => {
        const projectElem = target;
        const projectElemId = target.getAttribute('data-id');
        this.#activeProject =
            this.#projectsController.getActiveProject(projectElemId);
        this.#activeProjectElemId = projectElemId;

        this.#removeFocusClassOnProjectElems();
        this.#addFocusClassOnProjectElem(projectElem);

        this.#renderActiveProjectToDos(projectElemId);
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
        }

        if (e.target.parentNode.classList.contains('project_block')) {
            const target = e.target.parentNode;
            this.#setActiveProjectElem(target);
        }
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

        this.#activeProject.addToDo(title, description, date, false, false);
        this.#hideElement(this.#toDoForm);
        this.#hideElement(this.#overlayDiv);
        this.#hideHeaderContent();
        this.#renderActiveProjectToDos(this.#activeProjectElemId);
        e.target.reset();
    };

    handleClickDeleteProject = (e) => {
        if (e.target.classList.contains('delete_icon')) {
            const projectIndex = e.target.parentNode.getAttribute('data-id');
            if (+projectIndex === 0) return;
            this.#projectsController.deleteProject(projectIndex);

            if (this.#activeProjectElemId === projectIndex) {
                this.#activeProjectElemId -= 1;
                this.#activeProject = this.#projectsController.getActiveProject(
                    this.#activeProjectElemId,
                );
                this.#renderActiveProjectToDos(this.#activeProjectElemId);
            }
            this.renderProjects();
        }
    };

    handleClickDeleteToDo = (e) => {
        if (e.target.classList.contains('delete_card-icon')) {
            const toDoCardIndex =
                e.target.parentNode.parentNode.getAttribute('data-todo-id');

            this.#projectsController.deleteToDoFromProject(
                this.#activeProjectElemId,
                toDoCardIndex,
            );

            this.#renderActiveProjectToDos(this.#activeProjectElemId);
        }
    };

    handleClickMarkAsDone = (e) => {
        if (e.target.classList.contains('button_status')) {
            const toDoCardIndex = e.target
                .closest('.toDo_card')
                .getAttribute('data-todo-id');

            this.#projectsController.toggleDoneStatus(
                this.#activeProjectElemId,
                toDoCardIndex,
            );

            this.#renderActiveProjectToDos(this.#activeProjectElemId);
        }
    };

    handleClickMarkAsImportant = (e) => {
        if (e.target.classList.contains('button_important')) {
            const toDoCardIndex = e.target
                .closest('.toDo_card')
                .getAttribute('data-todo-id');

            this.#projectsController.toggleImportantStatus(
                this.#activeProjectElemId,
                toDoCardIndex,
            );

            this.#renderActiveProjectToDos(this.#activeProjectElemId);
        }
    };
}

export default DisplayController;
