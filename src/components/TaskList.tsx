import React from 'react';
import { observer } from 'mobx-react-lite';
import TaskItem from './TaskItem';
import { Task } from '../store';

interface TaskListProps {
    tasks: Task[];
    onCheckboxClick: (taskId: number) => void;
    onCreateSubtask: (task: Task) => void;
    onTaskClick: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
                                               tasks,
                                               onCheckboxClick,
                                               onCreateSubtask,
                                               onTaskClick,
                                           }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onCheckboxClick={onCheckboxClick}
                    onCreateSubtask={onCreateSubtask}
                    onTaskClick={onTaskClick}
                />
            ))}
        </ul>
    );
};

export default observer(TaskList);
