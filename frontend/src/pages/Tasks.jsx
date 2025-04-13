import React, { useCallback, useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TASk_STATUS_FILTER } from '../constants/constants';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState(TASk_STATUS_FILTER.ALL);
    const [dateFilter, setDateFilter] = useState(null);
    const [searchWords, setSearchWords] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();

    const getTasks = useCallback(
        async (statusFilter = null, date = null, search = null) => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            status:
                                statusFilter === TASk_STATUS_FILTER.ALL
                                    ? null
                                    : statusFilter,
                            deadline: date,
                            search,
                        },
                    },
                );
                const data = response.data;
                console.log(data.tasks);
                setTasks(data.tasks);
            } catch (error) {
                setError('Error al buscar tareas');
            } finally {
                setLoading(false);
            }
        },
        [token],
    );

    const getTask = useCallback(
        async (idTask) => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks/${idTask}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = response.data;
                console.log(data.task);
                setSelectedTask(data.task);
            } catch (error) {
                setError('Error al buscar tarea');
            } finally {
                setLoading(false);
            }
        },
        [token],
    );

    const createTask = useCallback(
        async (task) => {
            console.log('Create Task', task);
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks`,
                    { ...task },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = response.data;
                console.log(data.task);
                setSelectedTask(null);
            } catch (error) {
                setError('Error al buscar tarea');
            } finally {
                setLoading(false);
            }
        },
        [token],
    );

    const updateTask = useCallback(
        async (idTask, task) => {
            console.log('Update Task', task);
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks/${idTask}`,
                    { ...task },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = response.data;
                console.log(data.task);
                setSelectedTask(null);
            } catch (error) {
                setError('Error al buscar tarea');
            } finally {
                setLoading(false);
            }
        },
        [token],
    );

    const deleteTask = useCallback(
        async (idTask) => {
            try {
                const response = await axios.delete(
                    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks/${idTask}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = response.data;
                console.log(data.task);
                setSelectedTask(null);
            } catch (error) {
                setError('Error al buscar tarea');
            }
        },
        [token],
    );

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        getTasks(statusFilter, dateFilter, searchWords);
    }, [token, navigate, getTasks, statusFilter, dateFilter, searchWords]);

    const onStatusFilterChange = (status) => {
        setStatusFilter(status);
    };

    const onDateFilterChange = (date) => {
        setDateFilter(date);
    };

    const onSearchWordsChange = (word) => {
        setSearchWords(word);
    };

    const onSelectedTask = (idTask) => {
        if (idTask) {
            getTask(idTask);
        } else {
            setSelectedTask(null);
        }
    };

    const onSaverOrUpdateTask = async (task) => {
        console.log(task);
        const filteredTaskData = {
            ...(task?.title && { title: task.title }),
            ...(task?.description && { description: task.description }),
            ...(task?.deadline && { deadline: task.deadline }),
            ...(task?.status && { status: task.status }),
        };
        setLoading(true);
        if (task.id) {
            await updateTask(task.id, filteredTaskData);
        } else {
            await createTask(filteredTaskData);
        }
        getTasks();
    };

    const onDeleteTask = async (idTask) => {
        setLoading(true);
        if (idTask) {
            await deleteTask(idTask);
        }
        getTasks();
    };

    const onChangeStatus = async (idTask, newStatus) => {
        setLoading(true);
        if (idTask) {
            await onSaverOrUpdateTask({ id: idTask, status: newStatus });
        }
    };

    const unsetTask = () => {
        setSelectedTask(null);
    };

    if (loading)
        return (
            <div className="loading">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            </div>
        );
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="mx-auto px-5 py-10">
            <h1 className="mb-7 text-4xl text-text-primary">
                Gestor de Tareas
            </h1>
            <TaskForm
                taskData={selectedTask}
                onSaverOrUpdateTask={onSaverOrUpdateTask}
                unsetTask={unsetTask}
            />
            <TaskList
                tasks={tasks}
                statusFilter={statusFilter}
                dateFilter={dateFilter}
                searchWords={searchWords}
                onStatusFilterChange={onStatusFilterChange}
                onDateFilterChange={onDateFilterChange}
                onSearchWordsChange={onSearchWordsChange}
                onSelectedTask={onSelectedTask}
                onDeleteTask={onDeleteTask}
                onChangeStatus={onChangeStatus}
            />
        </div>
    );
};

export default Tasks;
