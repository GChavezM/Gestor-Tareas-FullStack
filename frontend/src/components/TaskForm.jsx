import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const TaskForm = ({ taskData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
    });

    useEffect(() => {
        if (taskData) {
            setFormData(taskData);
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
        console.log(formData);
    };

    return (
        <div className="bg-background-secondary shadow-shadow-card mb-10 rounded-xl p-8">
            <h2 className="text-text-primary mb-5 text-xl">
                <FontAwesomeIcon className="text-primary mr-2" icon={faPlus} />
                Crear Tarea
            </h2>
            <form className="flex flex-col gap-5" onSubmit={saveOrUpdate}>
                <div className="flex w-full items-center gap-3">
                    <FontAwesomeIcon
                        className="text-text-secondary flex-shrink-0 text-lg"
                        icon={faPenToSquare}
                    />
                    <input
                        className="border-border bg-input-background text-text-primary focus:border-primary focus:shadow-shadow-box flex-grow rounded-lg border p-3 text-base transition-all duration-200 ease-in-out focus:outline-none"
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
                        className="text-text-secondary flex-shrink-0 text-lg"
                        icon={faPenToSquare}
                    />
                    <textarea
                        className="border-border bg-input-background text-text-primary focus:border-primary focus:shadow-shadow-box min-h-28 flex-grow resize-y rounded-lg border p-3 text-base transition-all duration-200 ease-in-out focus:outline-none"
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex w-full items-center gap-3">
                    <FontAwesomeIcon
                        className="text-text-secondary flex-shrink-0 text-lg"
                        icon={faPenToSquare}
                    />
                    <input
                        className="border-border bg-input-background text-text-primary focus:border-primary focus:shadow-shadow-box flex-grow rounded-lg border p-3 text-base transition-all duration-200 ease-in-out focus:outline-none"
                        type="date"
                        name="deadline"
                        placeholder="Fecha límite"
                        value={formData.deadline}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    className="bg-primary text-background-secondary hover:bg-primary-hover cursor-pointer rounded-lg p-3.5 text-base font-semibold transition-all duration-200 ease-in-out hover:translate-y-[-1px]"
                    type="submit">
                    <FontAwesomeIcon className="mr-2" icon={faPlus} /> Crear
                    Tarea
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
};

export default TaskForm;
