import React from 'react';
import { observer } from 'mobx-react-lite';
import { Task } from '../store';

interface TaskDetailProps {
    selectedTask: Task | null;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ selectedTask }) => {
    if (!selectedTask) {
        return null;
    }

    return (
        <div>
            <h2>Task Detail</h2>
            <h3>{selectedTask.title}</h3>
            <p>{selectedTask.description}</p>
        </div>
    );
};

export default observer(TaskDetail);
