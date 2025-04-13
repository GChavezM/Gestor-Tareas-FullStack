import React, { useState } from 'react';
import HomeForm from '../components/HomeForm';
import { HOME_FORM_TYPES } from '../constants/constants';

const Home = () => {
    const [action, setAction] = useState(HOME_FORM_TYPES.SIGNIN);

    return (
        <div className="mx-auto mt-24 flex w-[600px] flex-col rounded-xl bg-background-secondary p-10 shadow-shadow-card">
            <div className="mt-5 flex w-full flex-col items-center gap-2.5">
                <div className="text-5xl font-bold text-primary">
                    {action === HOME_FORM_TYPES.SIGNIN
                        ? 'Iniciar Sesión'
                        : 'Registrarse'}
                </div>
                <div className="h-1.5 w-20 rounded-md bg-primary" />
            </div>
            <HomeForm mode={action} setAction={setAction} />
            <div className="mx-auto my-10 flex gap-7">
                <div
                    className={`${action === HOME_FORM_TYPES.SIGNUP ? 'bg-primary text-background-secondary hover:bg-primary-hover' : 'cursor-not-allowed bg-input-background text-text-secondary hover:bg-border'} flex h-12 w-56 cursor-pointer items-center justify-center rounded-lg text-base font-semibold transition-all duration-200 ease-in-out hover:-translate-y-0.5`}
                    onClick={() => setAction(HOME_FORM_TYPES.SIGNIN)}
                    disabled>
                    Iniciar Sesión
                </div>
                <div
                    className={`${action === HOME_FORM_TYPES.SIGNIN ? 'bg-primary text-background-secondary hover:bg-primary-hover' : 'cursor-not-allowed bg-input-background text-text-secondary hover:bg-border'} flex h-12 w-56 cursor-pointer items-center justify-center rounded-lg text-base font-semibold transition-all duration-200 ease-in-out hover:-translate-y-0.5`}
                    onClick={() => setAction(HOME_FORM_TYPES.SIGNUP)}>
                    Registrate
                </div>
            </div>
        </div>
    );
};

export default Home;
