import ProjectsController from './projectsController';

class DisplayController {
    #projectsContainer = document.querySelector('.projects_wrapper');
    #toDosContainer = document.querySelector('.tasks_container');
    #projectForm = document.querySelector('.project_form');
    #projectsController = new ProjectsController();
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

    #addProjectToContainer = (title) => {
        this.#projectsController.addProject(title);
    };

    #deleteProjectFromContainer = (id) => {
        this.#projectsController.deleteProject(id);
        this.#renderProjects();
    };

    #displayProjectForm = () => {
        this.#projectForm.classList.remove('hidden');
    };

    #hideProjectForm = () => {
        this.#projectForm.classList.add('hidden');
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

    handleClickAddProject = () => {
        this.#displayProjectForm();
    };

    handleSubmitAddProjectForm = (e) => {
        e.preventDefault();

        let titleName = document.querySelector('#title_input');

        if (titleName.value === '') return;

        this.#addProjectToContainer(titleName.value);
        this.#renderProjects();
        this.#hideProjectForm();

        titleName.value = '';
    };

    handleSubmitCancelProjectForm = (e) => {
        e.preventDefault();

        let titleName = document.querySelector('#title_input');

        this.#hideProjectForm();
        titleName.value = '';
    };

    handleClickOnProject = (e) => {
        if (e.target.classList.contains('project_block')) {
            const projectElem = e.target;
            const projectElemId = e.target.getAttribute('data-id');
            this.#activeProjectElemId = projectElemId;

            this.#removeFocusClassOnProjectElems();
            this.#addFocusClassOnProjectElem(projectElem);
        }
    };
}

export default DisplayController;
