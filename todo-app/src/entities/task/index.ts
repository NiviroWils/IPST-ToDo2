export interface Task {
    id: string;
    text: string;
    date: string;
    completed: boolean;
}

export const createTask = (text: string, date: string): Task => ({
    id: crypto.randomUUID(),
    text,
    date,
    completed: false,
});
