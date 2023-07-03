import React from 'react';
import { Input } from 'antd';
import { useField } from 'formik';
import FieldError from 'src/common/components/field-error';

import './simple-field.scss';

interface SimpleInputProps {
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}
const SimpleField: React.FC<SimpleInputProps> = ({
    name,
    label,
    placeholder,
    disabled = false,
    required = false,
}) => {
    const [field, meta] = useField(name);

    return (
        <React.Fragment>
            <div className="field__label">
                { label }
                { required && ' *' }
            </div>
            <Input
                placeholder={ placeholder }
                disabled={ disabled }
                status={ meta.error && meta.touched && 'error' }
                { ...field }
                size="large"
            />
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </React.Fragment>
    );
};

export default SimpleField;
