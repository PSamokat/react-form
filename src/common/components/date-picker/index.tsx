import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import { useField } from 'formik';
import FieldError from 'src/common/components/field-error';

import './date-picker.scss';

interface SimpleDatePickerProps {
    name?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
}
const SimpleDatePicker: React.FC<SimpleDatePickerProps> = ({
    name, label, required, ...props
}) => {
    const [field, meta, helper] = useField(name);
    const handleOnChange: DatePickerProps['onChange'] = (date) => {
        helper.setValue(date);
    };

    const dateFormat = 'DD.MM.YYYY';

    return (
        <div className="date-picker">
            <div className="date-picker__label">
                { label }
                { required && ' *' }
            </div>
            <DatePicker
                { ...field }
                onChange={ handleOnChange }
                { ...props }
                status={ meta.error && meta.touched && 'error' }
                format={ dateFormat }
                size="large"
                placeholder="Дата"
                className="date-picker__picker"
            />
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </div>
    );
};

export default SimpleDatePicker;
