import { nanoid } from 'nanoid';

class ToDo {
    #title;
    #description;
    #dueDate;
    #isImportant;
    #isDone;
    #parentId;
    #id = nanoid();

    constructor(title, description, dueDate, isImportant, isDone, parentId) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = new Date(dueDate);
        this.#isImportant = isImportant;
        this.#isDone = isDone;
        this.#parentId = parentId;
    }

    getToDoInfo = () => {
        return {
            title: this.#title,
            description: this.#description,
            date: this.#dueDate,
            isImportant: this.#isImportant,
            isDone: this.#isDone,
        };
    };

    getParentId = () => {
        return this.#parentId;
    };

    getId = () => {
        return this.#id;
    };

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
