import React from 'react';
import { useLocation } from 'react-router-dom';

import { STEPS, stepsComposition, StepStatus } from './steps-composition';

import './form-progress.scss';

const FormProgress: React.FC = () => {
    const { pathname } = useLocation();

    const getCurrentStep = (index: number): StepStatus => {
        const step = stepsComposition.findIndex((value) => value === pathname);

        if (index < step) {
            return StepStatus.DONE;
        }
        if (index === step) {
            return StepStatus.CURRENT;
        }

        return StepStatus.UPCOMING;
    };

    return (
        <div className="form-progress">
            <div className="form-progress__title">
                <div className="form-progress__header">Создание аккаунта</div>
                <div className="form-progress__description">
                    Заполните все пункты данной формы и нажмите кнопку «Сохранить».
                </div>
            </div>
            <div className="form-progress__steps">
                { STEPS.map((step, index) => (
                    <div key={ index } className="form-progress__step">
                        <div className={ `form-progress__status ${getCurrentStep(index)}` }>
                            { index + 1 }
                        </div>
                        <div className={ `form-progress__step ${getCurrentStep(index)}` }>{ step }</div>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default FormProgress;
