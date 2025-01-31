import { useSyncExternalStore } from 'react';
import { taskStore, toggleTask, removeTask, updateTask } from '../shared/store/taskStore';
import { useState } from 'react';

const TaskList = () => {
    const tasks = useSyncExternalStore(taskStore.subscribe, () => taskStore.state.tasks);
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newText, setNewText] = useState('');

    console.log('Текущие задачи:', tasks);

    const filteredTasks = tasks.filter((task) => task.date === selectedDate);

    const startEditing = (taskId: string, currentText: string) => {
        setEditingId(taskId);
        setNewText(currentText);
    };

    const saveEdit = (taskId: string) => {
        if (newText.trim()) {
            updateTask(taskId, newText);
        }
        setEditingId(null);
    };

    return (
        <div className="w-full max-w-lg mx-auto space-y-6">
            <div className="flex justify-center mb-4">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-pink-300 rounded-lg px-4 py-2 shadow-sm bg-pink-100 text-pink-700 focus:ring-2 focus:ring-pink-400 transition"
                />
            </div>

            <div className="bg-pink-50 p-6 shadow-lg rounded-2xl border border-pink-200">
                <h2 className="text-lg font-semibold text-pink-800 mb-3 text-center">
                    {new Date(selectedDate).toLocaleDateString()}
                </h2>
                {filteredTasks.length === 0 ? (
                    <p className="text-pink-500 text-center">Нет задач на этот день</p>
                ) : (
                    <ul className="space-y-3">
                        {filteredTasks.map((task) => (
                            <li key={task.id} className="flex justify-between items-center bg-pink-100 p-4 rounded-xl shadow-md">
                                {editingId === task.id ? (
                                    <input
                                        className="border border-pink-300 rounded-lg px-3 py-1 w-full focus:ring-2 focus:ring-pink-400 transition"
                                        value={newText}
                                        onChange={(e) => setNewText(e.target.value)}
                                        onBlur={() => saveEdit(task.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') saveEdit(task.id);
                                            if (e.key === 'Escape') setEditingId(null);
                                        }}
                                        autoFocus
                                    />
                                ) : (
                                    <span
                                        className={task.completed ? 'line-through text-pink-400 cursor-pointer' : 'text-pink-800 cursor-pointer'}
                                        onClick={() => startEditing(task.id, task.text)}
                                    >
                                        {task.text}
                                    </span>
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg transition shadow-md"
                                    >
                                        {task.completed ? 'Отменить' : 'Выполнить'}
                                    </button>
                                    <button
                                        onClick={() => startEditing(task.id, task.text)}
                                        className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded-lg transition shadow-md"
                                    >
                                        Изменить
                                    </button>
                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg transition shadow-md"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TaskList;
