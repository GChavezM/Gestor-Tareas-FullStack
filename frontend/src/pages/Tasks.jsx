import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Tasks = () => {
    return (
        <div className="mx-auto px-5 py-10">
            <h1 className="text-text-primary mb-7 text-4xl">
                Gestor de Tareas
            </h1>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default Tasks;
