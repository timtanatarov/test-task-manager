import { createContext, useContext } from 'react';
import { observable, action, makeObservable } from 'mobx';

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    children: Task[];
}

class TaskStore {
    tasks: Task[] = [];
    selectedTask: Task | null = null;

    constructor() {
        makeObservable(this, {
            tasks: observable,
            selectedTask: observable,
            toggleTaskCompletion: action,
            createSubtask: action,
            setSelectedTask: action,
        });
    }

    toggleTaskCompletion(taskId: number) {
        const task = this.findTaskById(taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }

    createSubtask(task: Task) {
        if (this.selectedTask) {
            this.selectedTask.children.push(task);
        }
    }

    setSelectedTask(task: Task) {
        this.selectedTask = task;
    }

    private findTaskById(taskId: number): Task | undefined {
        function findTask(tasks: Task[]): Task | undefined {
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                if (task.id === taskId) {
                    return task;
                }
                if (task.children) {
                    const childTask = findTask(task.children);
                    if (childTask) {
                        return childTask;
                    }
                }
            }
            return undefined;
        }
        return findTask(this.tasks);
    }
}

const StoreContext = createContext({
    taskStore: new TaskStore(),
});

export const useStore = () => useContext(StoreContext);
