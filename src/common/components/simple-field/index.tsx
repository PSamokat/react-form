import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, InputProps } from 'antd';
import { useField } from 'formik';
import FieldError from 'src/common/components/field-error';

import './simple-field.scss';

interface SimpleInputProps extends InputProps {
    name?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    isLoading?: boolean;
}
const SimpleField: React.FC<SimpleInputProps> = ({
    name,
    label,
    disabled = false,
    required = false,
    isLoading,
    ...props
}) => {
    const [field, meta] = useField(name);

    const isError = meta.error && meta.touched;

    return (
        <React.Fragment>
            <div className="field__label">
                { label }
                { required && ' *' }
            </div>
            <Input
                { ...field }
                { ...props }
                disabled={ disabled }
                status={ meta.error && meta.touched && 'error' }
                size="large"
                addonAfter={ isLoading && <LoadingOutlined /> }
            />
            { isError && <FieldError errorMessage={ meta.error } /> }
        </React.Fragment>
    );
};

export default SimpleField;
