import React, { useMemo } from 'react';
import {
    Input, InputProps, Select, SelectProps,
} from 'antd';
import { useField } from 'formik';
import deleteIcon from 'src/common/assets/cross.svg';
import FieldError from 'src/common/components/field-error';

import './social-select.scss';

interface SocialSelectProps {
    label: string;
    required?: boolean;
    disabled?: boolean;
    selectName?: string;
    inputName?: string;
    selectProps?: SelectProps;
    inputProps?: InputProps;
    onDelete?: () => void;
    selectPlaceholder?: string;
    inputPlaceholder?: string;
}

const SocialSelect: React.FC<SocialSelectProps> = ({
    label,
    required,
    disabled,
    selectName,
    inputName,
    selectProps,
    inputProps,
    onDelete,
    selectPlaceholder,
    inputPlaceholder,
}) => {
    const [selectField, selectMeta, selectHelper] = useField(selectName);
    const [inputField, inputMeta] = useField(inputName);

    const urlPlaceholder = useMemo(
        () => selectProps?.options.find((option) => option.value === selectField.value),
        [selectProps.options, selectField.value],
    );
    const handleSelectOnChange = (value) => {
        selectHelper.setValue(value);
    };
    const isSelectError = selectMeta.error && selectMeta.touched;
    const isInputError = inputMeta.error && inputMeta.touched;

    return (
        <div className="social-select">
            <div className="social-select__label">
                { label }
                { required && ' *' }
            </div>
            <div className="social-select__container">
                <Select
                    { ...selectField }
                    { ...selectProps }
                    onChange={ handleSelectOnChange }
                    defaultValue={ null }
                    placeholder={ selectPlaceholder || 'Выбрать' }
                    status={ selectMeta.error && selectMeta.touched && 'error' }
                    disabled={ disabled }
                    className="social-select__select"
                    size="large"
                />
                <Input
                    { ...inputField }
                    { ...inputProps }
                    placeholder={ inputPlaceholder || urlPlaceholder?.url }
                    className={ `social-select__field ${selectField.value && 'visible'}` }
                    status={ inputMeta.error && inputMeta.touched && 'error' }
                    disabled={ disabled }
                    size="large"
                />
                { selectField.value && (
                    <button
                        type="button"
                        className="social-select__delete"
                        onClick={ onDelete }
                        disabled={ disabled }
                    >
                        <img src={ deleteIcon } alt="del" />
                    </button>
                ) }
            </div>
            { (isSelectError || isInputError) && (
                <FieldError errorMessage={ `${inputMeta.error || ''}\n${selectMeta.error || ''}` } />
            ) }
        </div>
    );
};

export default SocialSelect;
