import Project from './project';

class ProjectsController {
    #projects = [];

    constructor() {}

    addProject = (title) => {
        return (this.#projects = [...this.#projects, new Project(title)]);
    };

    deleteProject = (i) => {
        const project = this.getActiveProject(i);
        const id = project.getId();

        this.#projects = this.#projects.filter((project) => {
            return !(project.getId() === id);
        });
    };

    deleteToDoFromProject = (projectIndex, toDoIndex) => {
        this.getActiveProject(projectIndex).deleteToDo(toDoIndex);
    };

    getProjects = () => {
        return this.#projects;
    };

    getActiveProject = (i) => {
        return this.#projects[i];
    };
}

export default ProjectsController;
