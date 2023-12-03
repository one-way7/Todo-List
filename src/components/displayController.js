import ProjectsController from './projectsController';

class DisplayController {
    #projectsContainer = document.querySelector('.projects_wrapper');
    #projectForm = document.querySelector('.project_form');
    #projectsController = new ProjectsController();
    #activeProject;

    constructor() {}

    #renderProjects = () => {
        console.log(this.#projectsContainer);
        this.#projectsContainer.textContent = '';

        this.#projectsController.getProjects().forEach((project) => {
            const projectElem = document.createElement('div');
            projectElem.classList.add('project_block');
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

    deleteProjectFromContainer = (id) => {
        this.#projectsController.deleteProject(id);
        this.#renderProjects();
    };

    #displayProjectForm = () => {
        this.#projectForm.classList.remove('hidden');
    };

    #hideProjectForm = () => {
        this.#projectForm.classList.add('hidden');
    };

    handleAddProjectClick = () => {
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
}

export default DisplayController;
