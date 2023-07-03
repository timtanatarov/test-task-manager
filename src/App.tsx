import React from 'react';
import { Task, useStore } from './store';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';

function App() {
    const { taskStore } = useStore();

    const handleCheckboxClick = (taskId: number) => {
        taskStore.toggleTaskCompletion(taskId);
    };

    const handleCreateSubtask = (task: Task) => {
        taskStore.createSubtask(task);
    };

    const handleTaskClick = (task: Task) => {
        taskStore.setSelectedTask(task);
    };

    return (
        <div className="App">
            <TaskList
                tasks={taskStore.tasks}
                onCheckboxClick={handleCheckboxClick}
                onCreateSubtask={handleCreateSubtask}
                onTaskClick={handleTaskClick}
            />
            <TaskDetail selectedTask={taskStore.selectedTask} />
        </div>
    );
}

export default App;
