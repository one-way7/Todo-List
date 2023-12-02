import Project from './project';

class ProjectsController {
    #projects = [];

    constructor() {}

    addProject = (title) => {
        return (this.#projects = [...this.#projects, new Project(title)]);
    };

    deleteProject = (id) => {
        this.#projects = this.#projects.filter((project) => !project.id === id);
    };

    getProjects = () => {
        return this.#projects;
    };
}

export default ProjectsController;
