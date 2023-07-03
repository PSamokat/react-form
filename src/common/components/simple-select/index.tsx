import React from 'react';
import { Select, SelectProps } from 'antd';
import { useField } from 'formik';
import FieldError from 'src/common/components/field-error';

import './simple-select.scss';

interface SimpleInputProps {
    name?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    placeholder?: string;
}
const SimpleSelect: React.FC<SimpleInputProps> = ({
    name,
    label,
    disabled = false,
    required = false,
    options,
    placeholder,
}) => {
    const [field, meta, helper] = useField(name);
    const onChangeHandler: SelectProps['onChange'] = (value) => {
        helper.setValue(value);
    };

    return (
        <div className="select">
            <div className="select__label">
                { label }
                { required && ' *' }
            </div>
            <Select
                { ...field }
                defaultValue={ null }
                disabled={ disabled }
                options={ options }
                placeholder={ placeholder }
                status={ meta.error && meta.touched && 'error' }
                onChange={ onChangeHandler }
                size="large"
                className="select__field"
            />
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </div>
    );
};

export default SimpleSelect;
