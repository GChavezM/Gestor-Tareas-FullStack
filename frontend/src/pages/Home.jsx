import React, { useState } from 'react';
import HomeForm from '../components/HomeForm';
import { HOME_FORM_TYPES } from '../constants/constants';

const Home = () => {
    const [action, setAction] = useState(HOME_FORM_TYPES.SIGNIN);

    return (
        <div className="bg-background-secondary shadow-shadow-card mx-auto mt-24 flex w-[600px] flex-col rounded-xl p-10">
            <div className="mt-5 flex w-full flex-col items-center gap-2.5">
                <div className="text-primary text-5xl font-bold">
                    {action === HOME_FORM_TYPES.SIGNIN
                        ? 'Iniciar Sesión'
                        : 'Registrarse'}
                </div>
                <div className="bg-primary h-1.5 w-20 rounded-md" />
            </div>
            <HomeForm mode={'action'} />
            <div className="mx-auto my-10 flex gap-7">
                <div
                    className={`${action === HOME_FORM_TYPES.SIGNUP ? 'text-background-secondary bg-primary hover:bg-primary-hover' : 'text-text-secondary bg-input-background hover:bg-border cursor-not-allowed'} flex h-12 w-56 cursor-pointer items-center justify-center rounded-lg text-base font-semibold transition-all duration-200 ease-in-out hover:-translate-y-0.5`}
                    onClick={() => setAction(HOME_FORM_TYPES.SIGNIN)}
                    disabled>
                    Iniciar Sesión
                </div>
                <div
                    className={`${action === HOME_FORM_TYPES.SIGNIN ? 'text-background-secondary bg-primary hover:bg-primary-hover' : 'text-text-secondary bg-input-background hover:bg-border cursor-not-allowed'} flex h-12 w-56 cursor-pointer items-center justify-center rounded-lg text-base font-semibold transition-all duration-200 ease-in-out hover:-translate-y-0.5`}
                    onClick={() => setAction(HOME_FORM_TYPES.SIGNUP)}>
                    Registrate
                </div>
            </div>
        </div>
    );
};

export default Home;
