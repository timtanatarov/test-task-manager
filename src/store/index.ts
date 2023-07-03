import { createContext, useContext } from 'react';
import { observable, action, makeObservable } from 'mobx';

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    children?: Task[];
}

export class TaskStore {
    tasks: Task[] = [
        {
            id: 1,
            title: 'Task 1',
            completed: false,
            children: [
                {
                    id: 2,
                    title: 'Subtask 1.1',
                    completed: false,
                },
                {
                    id: 3,
                    title: 'Subtask 1.2',
                    completed: false,
                },
            ],
        },
        {
            id: 4,
            title: 'Task 2',
            completed: false,
        },
        {
            id: 5,
            title: 'Task 3',
            completed: false,
            children: [
                {
                    id: 6,
                    title: 'Subtask 3.1',
                    completed: false,
                },
            ],
        },
    ];

    constructor() {
        makeObservable(this, {
            tasks: observable,
            toggleTaskCompletion: action,
        });
    }

    toggleTaskCompletion(taskId: number) {
        const task = this.findTaskById(taskId);
        if (task) {
            task.completed = !task.completed;
        }
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

const StoreContext = createContext<TaskStore>(new TaskStore());

export const useStore = (): TaskStore => useContext(StoreContext);
