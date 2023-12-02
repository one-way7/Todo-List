import { nanoid } from 'nanoid';

class ToDo {
    #title;
    #description;
    #dueDate;
    #isImportant;
    #isDone;
    #id = nanoid();

    constructor(title, description, dueDate, isImportant, isDone) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = new Date(dueDate);
        this.#isImportant = isImportant;
        this.#isDone = isDone;
    }

    getTitle = () => {
        return this.#title;
    };

    getDescription = () => {
        return this.#description;
    };

    getDate = () => {
        return this.#dueDate;
    };

    getImportantStatus = () => {
        return this.#isImportant;
    };

    getDoneStatus = () => {
        return this.#isDone;
    };

    changeTitle = (newTitle) => {
        this.#title = newTitle;
    };

    changeDescription = (newDescr) => {
        this.#description = newDescr;
    };

    changeDuoDate = (newDate) => {
        this.#dueDate = new Date(newDate);
    };

    changeImportantStatus = () => {
        this.#isImportant = !this.#isImportant;
    };

    changeDoneStatus = () => {
        this.#isDone = !this.#isDone;
    };
}

export default ToDo;
