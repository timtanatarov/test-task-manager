// TaskList.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Task } from '../store';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const taskStore = useStore();

    const handleCheckboxClick = (taskId: number) => {
        taskStore.toggleTaskCompletion(taskId);
    };

    const renderTask = (task: Task) => {
        const handleCheckboxChange = () => {
            handleCheckboxClick(task.id);
        };

        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleCheckboxChange}
                />
                <span>{task.title}</span>
                {task.children && <TaskList tasks={task.children} />}
            </li>
        );
    };

    return <ul>{tasks.map(renderTask)}</ul>;
};

export default observer(TaskList);
