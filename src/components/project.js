import ToDo from './toDo';
import { nanoid } from 'nanoid';

class Project {
    #title;
    #id = nanoid();
    #toDos = [];

    constructor(title) {
        this.#title = title;
    }

    getId = () => {
        return this.#id;
    };

    changeTitle = (newTitle) => {
        this.#title = newTitle;
    };

    getTitle = () => {
        return this.#title;
    };

    addToDo = (title, description, dueDate, isImportant, isDone) => {
        this.#toDos = [
            ...this.#toDos,
            new ToDo(title, description, dueDate, isImportant, isDone),
        ];
    };

    deleteToDo = (id) => {
        this.#toDos = this.#toDos.filter((toDo) => !toDo.id === id);
    };

    getToDos = () => {
        return this.#toDos;
    };
}

export default Project;
