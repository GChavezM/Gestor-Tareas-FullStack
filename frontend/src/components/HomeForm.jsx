import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/auth';
import PropTypes from 'prop-types';
import { HOME_FORM_TYPES } from '../constants/constants';

const initialFormData = {
    name: '',
    email: '',
    password: '',
};

const HomeForm = ({ mode, setAction }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        console.log(formData);
        setError('');
        try {
            console.log(mode);
            if (mode === HOME_FORM_TYPES.SIGNIN) {
                console.log('login');
                const success = await auth.login(
                    formData.email,
                    formData.password,
                );
                console.log(success);
                if (success) {
                    navigate('/tasks');
                } else {
                    setError('Credenciales Inválidas');
                }
            } else {
                const success = await auth.register(
                    formData.name,
                    formData.email,
                    formData.password,
                );
                if (success) {
                    setAction(HOME_FORM_TYPES.SIGNIN);
                    setFormData(initialFormData);
                    setError('Registration successful! Please login.');
                } else {
                    setError('Registration failed');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="mt-11 flex flex-col gap-6">
            {mode === HOME_FORM_TYPES.SIGNUP && (
                <div className="w-120 h-15 m-auto flex items-center rounded-lg border border-solid border-border bg-input-background px-4 transition-all duration-200 ease-in-out">
                    <FontAwesomeIcon
                        className="w-6 text-lg text-text-secondary"
                        icon={faUser}
                    />
                    <input
                        className="h-12 w-[400px] border-none bg-transparent px-4 text-base text-text-primary placeholder-text-secondary outline-none"
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
            )}
            <div className="w-120 h-15 m-auto flex items-center rounded-lg border border-solid border-border bg-input-background px-4 transition-all duration-200 ease-in-out">
                <FontAwesomeIcon
                    className="w-6 text-lg text-text-secondary"
                    icon={faEnvelope}
                />
                <input
                    className="h-12 w-[400px] border-none bg-transparent px-4 text-base text-text-primary placeholder-text-secondary outline-none"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="w-120 h-15 m-auto flex items-center rounded-lg border border-solid border-border bg-input-background px-4 transition-all duration-200 ease-in-out">
                <FontAwesomeIcon
                    className="w-6 text-lg text-text-secondary"
                    icon={faLock}
                />
                <input
                    className="h-12 w-[400px] border-none bg-transparent px-4 text-base text-text-primary placeholder-text-secondary outline-none"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            {error && (
                <div className="my-5 rounded-lg border border-error-border bg-error-background p-3 text-center text-sm text-error-text">
                    {error}
                </div>
            )}
            <div>
                <button
                    className="w-full cursor-pointer rounded-lg border-none bg-primary px-4 py-3 text-base font-semibold text-background-secondary transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-primary-hover"
                    onClick={handleSubmit}>
                    Continuar
                </button>
            </div>
        </div>
    );
};

HomeForm.propTypes = {
    mode: PropTypes.oneOf([HOME_FORM_TYPES.SIGNIN, HOME_FORM_TYPES.SIGNUP])
        .isRequired,
    setAction: PropTypes.func.isRequired,
};

export default HomeForm;
