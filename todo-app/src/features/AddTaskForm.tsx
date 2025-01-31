import { useState } from 'react';
import { addTask } from '../shared/store/taskStore';

const AddTaskForm = () => {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Сегодняшняя дата

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTask(text, date);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-pink-50 p-6 shadow-lg rounded-2xl border border-pink-200 w-full max-w-lg mx-auto space-y-4">
            <h2 className="text-center text-lg font-semibold text-pink-800">Добавить задачу</h2>

            <input
                type="text"
                placeholder="Введите задачу..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border border-pink-300 rounded-lg px-4 py-2 w-full bg-pink-100 text-pink-700 focus:ring-2 focus:ring-pink-400 transition"
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-pink-300 rounded-lg px-4 py-2 w-full bg-pink-100 text-pink-700 focus:ring-2 focus:ring-pink-400 transition"
            />

            <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg w-full transition shadow-md"
            >
                Добавить
            </button>
        </form>
    );
};

export default AddTaskForm;
