import ProjectsController from './projectsController';

class DisplayController {
    #projectsContainer = document.querySelector('.projects_wrapper');
    #toDosContainer = document.querySelector('.toDos_wrapper');
    #projectForm = document.querySelector('.project_form');
    #headerContent = document.querySelector('.h3');
    #overlayDiv = document.querySelector('#overlay');
    #toDoForm = document.querySelector('.toDo_form');
    #addNewToDoBtn = document.querySelector('.new_task');
    #projectsController = new ProjectsController();
    #activeProject;
    #activeProjectElemId;

    constructor() {}

    #renderProjects = () => {
        this.#projectsContainer.textContent = '';

        this.#projectsController.getProjects().forEach((project, i) => {
            const projectElem = document.createElement('div');
            projectElem.classList.add('project_block');

            if (this.#activeProjectElemId && this.#activeProjectElemId == i) {
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
                <img
                    class="settings_icon"
                    src="./assets/icons/settings-icon.svg" 
                    alt="project settings icon"
                    width="45"
                    height="45"
                />
            `;

            this.#projectsContainer.insertAdjacentElement(
                'beforeend',
                projectElem,
            );
        });
    };

    #renderActiveProjectToDos = (id) => {
        this.#toDosContainer.textContent = '';

        this.#projectsController
            .getActiveProject(id)
            .getToDos()
            .forEach((toDo) => {
                const { title, description, date, isImportant, isDone } =
                    toDo.getToDoInfo();

                const toDoElem = document.createElement('div');
                toDoElem.classList.add('toDo_card');

                toDoElem.innerHTML = `
                    <div class="toDo_card-content">
                        <div class="toDo_title">${title}</div>
                        <div class="toDo_descr">${description}</div>
                        <div class="toDo_date">${date}</div>
                        <button class="button_status">
                            Mark as done
                        </button>
                    </div>
                    <div class="toDo_card-settings">
                        <span class="material-symbols-rounded">
                            more_vert
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

    #deleteProjectFromContainer = (id) => {
        this.#projectsController.deleteProject(id);
        this.#renderProjects();
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
        if (this.#activeProject.getToDos().length > 0) {
            this.#hideElement(this.#headerContent);
        }
    };

    #showHeaderContent = () => {
        if (this.#activeProject.getToDos().length === 0) {
            this.#displayElement(this.#headerContent);
        }
    };

    handleClickAddProject = () => {
        this.#displayElement(this.#projectForm);
    };

    handleSubmitAddProjectForm = (e) => {
        e.preventDefault();

        let titleName = document.querySelector('#title_input');

        if (titleName.value === '') return;

        this.#addProjectToContainer(titleName.value);
        this.#renderProjects();
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
            const projectElem = e.target;
            const projectElemId = e.target.getAttribute('data-id');
            this.#activeProject =
                this.#projectsController.getActiveProject(projectElemId);
            this.#activeProjectElemId = projectElemId;

            this.#removeFocusClassOnProjectElems();
            this.#addFocusClassOnProjectElem(projectElem);

            this.#renderActiveProjectToDos(projectElemId);

            if (this.#addNewToDoBtn.classList.contains('hidden')) {
                this.#displayElement(this.#addNewToDoBtn);
            }
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
}

export default DisplayController;
