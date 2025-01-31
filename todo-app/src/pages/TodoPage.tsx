import TaskList from '../../src/widget/TaskList';

const TodoPage = () => {
    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 red" >Мои задачи</h1>
            <TaskList />
        </div>
    );
};

export default TodoPage;
