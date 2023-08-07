import React from 'react';
import { Select, SelectProps } from 'antd';
import { useField } from 'formik';
import FieldError from 'src/common/components/field-error';

import './simple-select.scss';

interface SimpleInputProps extends SelectProps{
    name?: string;
    label?: string;
    required?: boolean;
}
const SimpleSelect: React.FC<SimpleInputProps> = ({
    name,
    label,
    required = false,
    ...props
}) => {
    const [field, meta, helper] = useField(name);
    const handleOnChange: SelectProps['onChange'] = (value) => {
        helper.setValue(value);
    };

    const isError = meta.error && meta.touched;

    return (
        <div className="select">
            <div className="select__label">
                { label }
                { required && ' *' }
            </div>
            <Select
                { ...field }
                { ...props }
                defaultValue={ null }
                status={ meta.error && meta.touched && 'error' }
                onChange={ handleOnChange }
                size="large"
                className="select__field"
            />
            { isError && (<FieldError errorMessage={ meta.error } />) }
        </div>
    );
};

export default SimpleSelect;
