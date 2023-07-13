import React, { ChangeEvent } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, InputProps } from 'antd';
import { useField } from 'formik';
import FieldError from 'src/common/components/field-error';

import './simple-field.scss';

interface SimpleInputProps extends InputProps{
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    onSearch?: (query: string) => void;
    isLoading?: boolean;
}
const SimpleField: React.FC<SimpleInputProps> = ({
    name,
    label,
    placeholder,
    disabled = false,
    required = false,
    onSearch,
    isLoading,
    ...props
}) => {
    const [field, meta, helper] = useField(name);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        helper.setValue(event.target.value);
        if (event.target.value.length === props.maxLength) {
            onSearch?.(event.target.value);
        }
    };

    return (
        <React.Fragment>
            <div className="field__label">
                { label }
                { required && ' *' }
            </div>
            <Input
                { ...field }
                { ...props }
                placeholder={ placeholder }
                disabled={ disabled }
                status={ meta.error && meta.touched && 'error' }
                size="large"
                addonAfter={ isLoading && <LoadingOutlined /> }
                onChange={ handleOnChange }
            />
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </React.Fragment>
    );
};

export default SimpleField;
