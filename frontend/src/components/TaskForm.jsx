import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencil,
    faPenToSquare,
    faPlus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const initialFormData = {
    title: '',
    description: '',
    deadline: '',
};

const TaskForm = ({
    taskData = null,
    onSaverOrUpdateTask = () => {},
    unsetTask = () => {},
}) => {
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (taskData) {
            setFormData({
                title: taskData.title,
                description: taskData.description,
                deadline: formatDate(taskData.deadline),
            });
        }
    }, [taskData]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const saveOrUpdate = async (e) => {
        e.preventDefault();
        const task = { ...formData, ...(taskData?.id && { id: taskData.id }) };
        console.log(task);
        onSaverOrUpdateTask(task);
    };

    const formatDate = (date) => {
        let dateFormat = date.substring(0, 10).split('-');
        dateFormat = dateFormat[1] + '-' + dateFormat[2] + '-' + dateFormat[0];
        const dateObject = new Date(dateFormat);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    let isCreate = true;
    if (taskData && taskData.id) {
        isCreate = false;
    }

    const cleanForm = () => {
        unsetTask();
        console.log(formData);
        setFormData(initialFormData);
    };

    return (
        <div className="mb-10 rounded-xl bg-background-secondary p-8 shadow-shadow-card">
            <h2 className="mb-5 text-xl text-text-primary">
                <FontAwesomeIcon
                    className="mr-2 text-primary"
                    icon={isCreate ? faPlus : faPencil}
                />
                {isCreate ? 'Crear Tarea' : 'Editar Tarea'}
            </h2>
            <form className="flex flex-col gap-5" onSubmit={saveOrUpdate}>
                <div className="flex w-full items-center gap-3">
                    <FontAwesomeIcon
                        className="flex-shrink-0 text-lg text-text-secondary"
                        icon={faPenToSquare}
                    />
                    <input
                        className="flex-grow rounded-lg border border-border bg-input-background p-3 text-base text-text-primary transition-all duration-200 ease-in-out focus:border-primary focus:shadow-shadow-box focus:outline-none"
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex w-full items-center gap-3">
                    <FontAwesomeIcon
                        className="flex-shrink-0 text-lg text-text-secondary"
                        icon={faPenToSquare}
                    />
                    <textarea
                        className="min-h-28 flex-grow resize-y rounded-lg border border-border bg-input-background p-3 text-base text-text-primary transition-all duration-200 ease-in-out focus:border-primary focus:shadow-shadow-box focus:outline-none"
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex w-full items-center gap-3">
                    <FontAwesomeIcon
                        className="flex-shrink-0 text-lg text-text-secondary"
                        icon={faPenToSquare}
                    />
                    <input
                        className="flex-grow rounded-lg border border-border bg-input-background p-3 text-base text-text-primary transition-all duration-200 ease-in-out focus:border-primary focus:shadow-shadow-box focus:outline-none"
                        type="date"
                        name="deadline"
                        placeholder="Fecha límite"
                        value={formData.deadline}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    className="cursor-pointer rounded-lg bg-primary p-3.5 text-base font-semibold text-background-secondary transition-all duration-200 ease-in-out hover:translate-y-[-1px] hover:bg-primary-hover"
                    type="submit">
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={isCreate ? faPlus : faPencil}
                    />{' '}
                    {isCreate ? 'Crear Tarea' : 'Editar Tarea'}
                </button>
                <button
                    type="button"
                    className="cursor-pointer rounded-lg bg-delete p-3.5 text-base font-semibold text-background-secondary transition-all duration-200 ease-in-out hover:translate-y-[-1px] hover:bg-delete-hover"
                    onClick={cleanForm}>
                    <FontAwesomeIcon className="mr-2" icon={faTrash} /> Limpiar
                </button>
            </form>
        </div>
    );
};

TaskForm.propTypes = {
    taskData: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        deadline: PropTypes.string,
    }),
    onSaverOrUpdateTask: PropTypes.func.isRequired,
    unsetTask: PropTypes.func.isRequired,
};

export default TaskForm;
