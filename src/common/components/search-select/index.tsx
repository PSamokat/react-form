import React, { useCallback, useMemo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import { FormikContextType, useField, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import FieldError from 'src/common/components/field-error';

import './search-select.scss';

interface SearchSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'children' > {
    getOptions: (query: string, formik: FormikContextType<any>) => void;
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
    const formikContext = useFormikContext();
    const [field, meta, helper] = useField(name);
    const debounceFetch = useMemo(
        () => debounce(getOptions, debounceTimeout),
        [getOptions, debounceTimeout],
    );
    const handleOnChange: SelectProps['onChange'] = (value: string, option) => {
        console.log(value, option);
        helper.setValue(value);
    };

    const handleOnSearch = useCallback(
        (query: string) => {
            debounceFetch(query, formikContext);
        },
        [formikContext],
    );

    return (
        <div className="select">
            <div className="select__label">
                { label }
                { required && ' *' }
            </div>
            <Select
                { ...field }
                { ...props }
                labelInValue={ true }
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
