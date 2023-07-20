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
    const handleOnChange = (value, option) => {
        helper.setValue({
            value,
            dadataObj: option.title,
        });
    };

    const handleOnSearch = (value) => {
        if (value.length === 0) {
            helper.setValue({
                value: undefined,
                dadataObj: {},
            });

            return;
        }
        helper.setValue({
            value,
            dadataObj: {},
        });
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
                value={ field?.value?.value }
                showSearch={ true }
                showArrow={ false }
                onSearch={ handleOnSearch }
                notFoundContent={ isFetching ? <LoadingOutlined size={ 1 } /> : null }
                status={ meta.error && meta.touched && 'error' }
                onChange={ handleOnChange }
                size="large"
                className="select__field"
                listHeight={ 150 }
            />
            <FieldError visibility={ meta.error && meta.touched } errorMessage={ meta.error } />
        </div>
    );
};

export default SearchSelect;
