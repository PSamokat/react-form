import React, { useMemo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import { useField } from 'formik';
import debounce from 'lodash/debounce';
import FieldError from 'src/common/components/field-error';

import './search-select.scss';

interface SearchSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, | 'children'> {
    getOptions: (search: string) => void;
    debounceTimeout?: number;
    isFetching?: boolean;
    name?: string;
    label?: string;
    required?: boolean;
}
const SearchSelect: React.FC<SearchSelectProps> = ({
    name,
    getOptions,
    debounceTimeout = 800,
    isFetching,
    label,
    required,
    ...props
}) => {
    const debounceFetch = useMemo(
        () => debounce(getOptions, debounceTimeout),
        [getOptions, debounceTimeout],
    );
    const [field, meta, helper] = useField(name);

    const onChangeHandler: SelectProps['onChange'] = (value: string) => {
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
                { ...props }
                showSearch={ true }
                showArrow={ false }
                onSearch={ debounceFetch }
                notFoundContent={ isFetching ? <LoadingOutlined size={ 1 } /> : null }
                status={ meta.error && meta.touched && 'error' }
                onChange={ onChangeHandler }
                size="large"
                className="select__field"
                listHeight={ 150 }
            />
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </div>

    );
};

export default SearchSelect;
