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

    addToDo = (title, description, dueDate, isImportant, isDone, parentId) => {
        this.#toDos = [
            ...this.#toDos,
            new ToDo(
                title,
                description,
                dueDate,
                isImportant,
                isDone,
                parentId,
            ),
        ];
    };

    deleteToDo = (id) => {
        this.#toDos = this.#toDos.filter((toDo) => !(toDo.getId() === id));
    };

    getToDos = () => {
        return this.#toDos;
    };

    getToDo = (i) => {
        return this.#toDos[i];
    };
}

export default Project;
