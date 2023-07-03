import React from 'react';
import { useField } from 'formik';
import manIcon from 'src/common/assets/man.svg';
import womanIcon from 'src/common/assets/woman.svg';
import FieldError from 'src/common/components/field-error';
import { Gender } from 'src/common/types/customer';

import './gender-switch.scss';

interface GenderSwitchProps {
    name?: string;
    required?: boolean;
}

const GenderSwitch: React.FC<GenderSwitchProps> = ({ name, required = false }) => {
    const [field, meta, helper] = useField(name);
    const handleToggle = (value: Gender) => {
        helper.setValue(value);
    };

    return (
        <div className="switch">
            <div className="switch__label">
                Пол
                { required && ' *' }
            </div>
            <div className="switch__container">
                <button
                    type="button"
                    className={ `switch__button ${field.value === Gender.MALE ? 'active' : ''} 
                    ${meta.touched && meta.error && 'error'}` }
                    onClick={ () => handleToggle(Gender.MALE) }
                >
                    <div className="switch__button-icon ">
                        <img src={ manIcon } alt="Man" />
                        <span>М</span>
                    </div>
                </button>
                <button
                    type="button"
                    className={ `switch__button ${field.value === Gender.FEMALE ? 'active' : ''} 
                    ${meta.touched && meta.error && 'error'}` }
                    onClick={ () => handleToggle(Gender.FEMALE) }
                >
                    <div className="switch__button-icon ">
                        <img src={ womanIcon } alt="Woman" />
                        <span>Ж</span>
                    </div>
                </button>
            </div>
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </div>
    );
};

export default GenderSwitch;
