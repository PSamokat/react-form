import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import { useField } from 'formik';
import FieldError from 'src/common/components/field-error';

import './search-select.scss';

interface SearchSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'children' > {
    debounceTimeout?: number;
    isFetching?: boolean;
    name?: string;
    label?: string;
    required?: boolean;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
    name,
    isFetching,
    label,
    required,
    ...props
}) => {
    const [field, meta, helper] = useField(name);

    return (
        <div className="select">
            <div className="select__label">
                { label }
                { required && ' *' }
            </div>
            <Select
                { ...field }
                { ...props }
                value={ field?.value?.value }
                showSearch={ true }
                showArrow={ false }
                notFoundContent={ isFetching ? <LoadingOutlined size={ 1 } /> : null }
                status={ meta.error && meta.touched && 'error' }
                size="large"
                className="select__field"
                listHeight={ 150 }
                onBlur={ () => helper.setTouched(true) }
            />
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </div>
    );
};

export default SearchSelect;
