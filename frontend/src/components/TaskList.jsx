import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencil,
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {
    TASk_STATUS,
    TASk_STATUS_FILTER,
    TASK_STATUS_LABELS,
} from '../constants/constants';

const STATUS_CLASSES = {
    [TASk_STATUS.PENDING]: 'border-status-pending',
    [TASk_STATUS.IN_PROGRESS]: 'border-status-progress',
    [TASk_STATUS.COMPLETED]: 'border-status-completed',
};

const STATUS_TRANSITION_CLASSES = {
    [TASk_STATUS.PENDING]:
        'hover:bg-status-progress hover:opacity-80 hover:text-background-secondary',
    [TASk_STATUS.IN_PROGRESS]:
        'hover:bg-status-completed hover:opacity-80 hover:text-background-secondary',
};

const STATUS_TRANSITION = {
    [TASk_STATUS.PENDING]: TASk_STATUS.IN_PROGRESS,
    [TASk_STATUS.IN_PROGRESS]: TASk_STATUS.COMPLETED,
};

const STATUS_TRANSITION_LABELS = {
    [TASk_STATUS.PENDING]: TASK_STATUS_LABELS.IN_PROGRESS,
    [TASk_STATUS.IN_PROGRESS]: TASK_STATUS_LABELS.COMPLETED,
};

const TaskList = ({
    tasks = [],
    statusFilter = TASk_STATUS_FILTER.ALL,
    dateFilter = '',
    searchWords = '',
    onStatusFilterChange = () => {},
    onDateFilterChange = () => {},
    onSearchWordsChange = () => {},
    onSelectedTask = () => {},
    onDeleteTask = () => {},
    onChangeStatus = () => {},
}) => {
    return (
        <div className="grid-cols-list grid gap-6">
            <h2 className="text-text-primary col-span-full mb-5 text-xl">
                <FontAwesomeIcon
                    className="text-primary mr-2"
                    icon={faPenToSquare}
                />{' '}
                Tus tareas
            </h2>
            <div className="col-span-full">
                <div className="mb-4 flex items-center gap-4">
                    {Object.keys(TASK_STATUS_LABELS).map((statusKey) => {
                        const borderClass =
                            STATUS_CLASSES[TASk_STATUS[statusKey]];
                        return (
                            <div
                                key={statusKey}
                                className="flex items-center gap-2">
                                <span
                                    className={`block h-4 w-4 border-l-4 ${borderClass}`}
                                />
                                <span className="text-text-secondary text-sm">
                                    {TASK_STATUS_LABELS[statusKey]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="col-span-full mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="statusFilter"
                            className="text-text-secondary text-sm">
                            Estado
                        </label>
                        <select
                            id="statusFilter"
                            className="bg-background-secondary border-border focus:ring-primary rounded-md border p-2 text-sm focus:outline-none focus:ring-2"
                            value={statusFilter}
                            onChange={(e) =>
                                onStatusFilterChange(e.target.value)
                            }>
                            <option value={TASk_STATUS_FILTER.ALL}>
                                Todos
                            </option>
                            <option value={TASk_STATUS_FILTER.PENDING}>
                                Pendiente
                            </option>
                            <option value={TASk_STATUS_FILTER.IN_PROGRESS}>
                                En Progreso
                            </option>
                            <option value={TASk_STATUS_FILTER.COMPLETED}>
                                Completado
                            </option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="dateFilter"
                            className="text-text-secondary text-sm">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="dateFilter"
                            className="bg-background-secondary border-border focus:ring-primary rounded-md border p-2 text-sm focus:outline-none focus:ring-2"
                            value={dateFilter}
                            onChange={(e) => onDateFilterChange(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <label
                            htmlFor="searchWords"
                            className="text-text-secondary text-sm">
                            Buscar
                        </label>
                        <input
                            type="text"
                            id="searchWords"
                            placeholder="Buscar palabras..."
                            className="bg-background-secondary border-border focus:ring-primary rounded-md border p-2 text-sm focus:outline-none focus:ring-2"
                            value={searchWords}
                            onChange={(e) =>
                                onSearchWordsChange(e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>

            {tasks.length === 0 ? (
                <p className="text-text-secondary col-span-full my-10 text-center text-base">
                    No tienes tareas. Crea una nueva!
                </p>
            ) : (
                tasks.map((task) => {
                    const taskBorderClass =
                        STATUS_CLASSES[task.status] || 'border-default';
                    const transitionState =
                        STATUS_TRANSITION_LABELS[task.status] || null;
                    const transitionClass =
                        STATUS_TRANSITION_CLASSES[task.status] ||
                        'hover:bg-default';
                    return (
                        <div
                            key={task.id}
                            className={`${taskBorderClass} bg-background-secondary shadow-shadow-card hover:shadow-shadow-card rounded-xl border-l-4 p-6 transition-all duration-200 ease-in-out hover:-translate-y-0.5`}>
                            <div className="mb-3 flex items-center gap-3">
                                <h3 className="text-text-primary mb-3 text-lg">
                                    {task.title}
                                </h3>
                            </div>
                            <p>{task.description}</p>
                            {task.deadline && (
                                <p>
                                    Fecha límite{' '}
                                    {new Date(
                                        task.deadline,
                                    ).toLocaleDateString()}
                                </p>
                            )}
                            <div className="mt-5 flex gap-3">
                                {transitionState && (
                                    <button
                                        className={`${transitionClass} border-border text-text-primary bg-input-background flex-1 cursor-pointer rounded-md border p-2 px-3 text-sm transition-all duration-200 ease-in-out`}
                                        onClick={() =>
                                            onChangeStatus(
                                                task.id,
                                                STATUS_TRANSITION[task.status],
                                            )
                                        }>
                                        Mover a {transitionState}
                                    </button>
                                )}
                                {task.status !== TASk_STATUS.COMPLETED && (
                                    <button
                                        className="bg-primary text-background-secondary hover:bg-primary-hover cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out"
                                        onClick={() => onSelectedTask(task.id)}>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faPencil}
                                        />
                                        Editar
                                    </button>
                                )}
                                {task.status === TASk_STATUS.COMPLETED && (
                                    <button
                                        className="bg-delete text-background-secondary hover:bg-delete-hover cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out"
                                        onClick={() => onDeleteTask(task.id)}>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faTrash}
                                        />
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    statusFilter: PropTypes.string.isRequired,
    dateFilter: PropTypes.string.isRequired,
    searchWords: PropTypes.string.isRequired,
    onStatusFilterChange: PropTypes.func.isRequired,
    onDateFilterChange: PropTypes.func.isRequired,
    onSearchWordsChange: PropTypes.func.isRequired,
    onSelectedTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
};

export default TaskList;
