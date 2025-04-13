import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { HOME_FORM_TYPES } from '../constants/constants';

const HomeForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        navigate('/tasks');
    };
    return (
        <div className="mt-11 flex flex-col gap-6">
            {props.mode === HOME_FORM_TYPES.SIGNUP && (
                <div className="w-120 h-15 bg-input-background border-border m-auto flex items-center rounded-lg border border-solid px-4 transition-all duration-200 ease-in-out">
                    <FontAwesomeIcon
                        className="text-text-secondary w-6 text-lg"
                        icon={faUser}
                    />
                    <input
                        className="text-text-primary placeholder-text-secondary h-12 w-[400px] border-none bg-transparent px-4 text-base outline-none"
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
            )}
            <div className="w-120 h-15 bg-input-background border-border m-auto flex items-center rounded-lg border border-solid px-4 transition-all duration-200 ease-in-out">
                <FontAwesomeIcon
                    className="text-text-secondary w-6 text-lg"
                    icon={faEnvelope}
                />
                <input
                    className="text-text-primary placeholder-text-secondary h-12 w-[400px] border-none bg-transparent px-4 text-base outline-none"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="w-120 h-15 bg-input-background border-border m-auto flex items-center rounded-lg border border-solid px-4 transition-all duration-200 ease-in-out">
                <FontAwesomeIcon
                    className="text-text-secondary w-6 text-lg"
                    icon={faLock}
                />
                <input
                    className="text-text-primary placeholder-text-secondary h-12 w-[400px] border-none bg-transparent px-4 text-base outline-none"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button
                    className="bg-primary text-background-secondary hover:bg-primary-hover w-full cursor-pointer rounded-lg border-none px-4 py-3 text-base font-semibold transition-all duration-200 ease-in-out hover:-translate-y-0.5"
                    onClick={handleSubmit}>
                    Continuar
                </button>
            </div>
        </div>
    );
};

HomeForm.propTypes = {
    mode: PropTypes.string.isRequired,
};

export default HomeForm;
