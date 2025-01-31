import {Task} from "../../entities/task";

export const getTasks = (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
