import { createRoot } from 'react-dom/client';
import './index.css';
import TaskList from "./widget/TaskList.tsx";
import AddTaskForm from "./features/AddTaskForm.tsx";

createRoot(document.getElementById('root')!).render(

        <div className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-lg">
            <AddTaskForm />
            <TaskList />
        </div>

);
