import React from 'react';
import TaskList from './components/TaskList';
import { useStore } from './store';

function App() {
    const store = useStore();

    return (
        <div className="App">
            <TaskList tasks={store.tasks} />
        </div>
    );
}

export default App;
