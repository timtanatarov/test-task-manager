import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TaskList from './TaskList';
import { Task } from '../store';

interface TaskItemProps {
    task: Task;
    onCheckboxClick: (taskId: number) => void;
    onCreateSubtask: (task: Task) => void;
    onTaskClick: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
                                               task,
                                               onCheckboxClick,
                                               onCreateSubtask,
                                               onTaskClick,
                                           }) => {
    const [isExpanded, setExpanded] = useState(true);

    const handleCheckboxClick = () => {
        onCheckboxClick(task.id);
    };

    const handleCreateSubtask = () => {
        const title = prompt('Enter subtask title:');
        const description = prompt('Enter subtask description:');
        if (title && description) {
            onCreateSubtask({
                id: Date.now(),
                title,
                description,
                completed: false,
                children: [],
            });
        }
    };

    const handleTaskClick = () => {
        onTaskClick(task);
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleCheckboxClick}
            />
            <span onClick={handleTaskClick}>{task.title}</span>
            {task.children.length > 0 && (
                <>
                    <button onClick={handleCreateSubtask}>Add Subtask</button>
                    <button onClick={() => setExpanded(!isExpanded)}>
                        {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                    {isExpanded && (
                        <TaskList
                            tasks={task.children}
                            onCheckboxClick={onCheckboxClick}
                            onCreateSubtask={onCreateSubtask}
                            onTaskClick={onTaskClick}
                        />
                    )}
                </>
            )}
        </li>
    );
};

export default observer(TaskItem);
