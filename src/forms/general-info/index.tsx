import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import generalIcon from 'src/common/assets/general-icon.svg';
import ActionButtons from 'src/common/components/action-buttons';
import DatePicker from 'src/common/components/date-picker';
import FormHeader from 'src/common/components/form-header';
import GenderSwitch from 'src/common/components/gender-switch';
import SearchSelect from 'src/common/components/search-select';
import SimpleField from 'src/common/components/simple-field';
import { useDaDataAddress, useDaDataCountries } from 'src/common/hooks/dadata';
import { DaDataGranularType } from 'src/common/types/dadata';
import type { RootState } from 'src/store';
import { formActions } from 'src/store/reducers/form';

import { FormRoutes } from '../route-to-component-relation';

import { convertToInitialValues, convertToStoreValue } from './converter';
import type { GeneralInfoFieldsModel } from './form-model';
import { generalInfoScheme } from './validation';

import './general-info.scss';

const GeneralFormFragment: React.FC<FormikProps<GeneralInfoFieldsModel>> = ({
    values,
    isSubmitting,
    resetForm,
    setFieldValue,
}) => {
    const [countrySuggestion, isCountriesLoading] = useDaDataCountries(values.citizenship?.value);
    const [citySuggestion, isCitiesLoading] = useDaDataAddress(
        values.city?.value,
        DaDataGranularType.CITY,
        values.citizenship?.value,
    );
    const handleOnChangeValue = (fieldName, value, option) => {
        setFieldValue(fieldName, {
            value,
            dadataObj: option.data,
        });
    };

    const handleOnSearch = (fieldName, value) => {
        if (value.length === 0) {
            setFieldValue(fieldName, {
                value: undefined,
                dadataObj: {},
            });

            return;
        }
        setFieldValue(fieldName, {
            value,
            dadataObj: {},
        });
    };

    return (
        <Form>
            <Row gutter={ [30, 15] }>
                <Col span={ 12 }>
                    <SimpleField
                        name="firstName"
                        placeholder="Иван"
                        label="Имя"
                        disabled={ isSubmitting }
                        required={ true }
                    />
                </Col>
                <Col span={ 12 }>
                    <SimpleField
                        name="surName"
                        placeholder="Иванович"
                        label="Отчество"
                        disabled={ isSubmitting }
                        required={ true }
                    />
                </Col>
                <Col span={ 12 }>
                    <SimpleField
                        name="lastName"
                        placeholder="Иванов"
                        label="Фамилия"
                        disabled={ isSubmitting }
                        required={ true }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="city"
                        required={ true }
                        disabled={ isSubmitting }
                        label="Основной город"
                        placeholder="Город"
                        isFetching={ isCitiesLoading }
                        options={ citySuggestion }
                        onSearch={ (value) => handleOnSearch('city', value) }
                        onChange={ (value, option) => handleOnChangeValue('city', value, option) }
                        onSelect={ (value, option) => handleOnChangeValue('city', value, option) }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="citizenship"
                        required={ true }
                        label="Гражданство"
                        disabled={ isSubmitting }
                        placeholder="Страна"
                        isFetching={ isCountriesLoading }
                        options={ countrySuggestion }
                        onSearch={ (value) => handleOnSearch('citizenship', value) }
                        onChange={ (value, option) =>
                            handleOnChangeValue('citizenship', value, option) }
                        onSelect={ (value, option) => handleOnChangeValue('citizenship', value, option) }
                    />
                </Col>
                <Col span={ 6 }>
                    <GenderSwitch name="gender" required={ true } disabled={ isSubmitting } />
                </Col>
                <Col span={ 6 }>
                    <DatePicker
                        name="birthDate"
                        disabled={ isSubmitting }
                        required={ true }
                        label="Дата рождения"
                    />
                </Col>
                <Col span={ 24 }>
                    <SimpleField
                        name="birthPlace"
                        label="Место рождения (как указано в паспорте)"
                        required={ true }
                        disabled={ isSubmitting }
                        placeholder="Введите наименование региона и населенного пункта"
                    />
                </Col>
            </Row>
            <ActionButtons onReject={ resetForm } isLoading={ isSubmitting } rejectText="Отмена" />
        </Form>
    );
};
const GeneralInfo: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (value: GeneralInfoFieldsModel): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        dispatch(formActions.setGeneralInfo(convertToStoreValue(value)));
        navigate(FormRoutes.OWNERSHIP);
    };

    return (
        <div className="general">
            <FormHeader
                image={ generalIcon }
                title="Общие"
                description="Введите свои персональные данные."
            />
            <Formik
                initialValues={ convertToInitialValues(fields) }
                onSubmit={ handleSubmit }
                validationSchema={ generalInfoScheme }
                validateOnBlur={ false }
            >
                { (props) => <GeneralFormFragment { ...props } /> }
            </Formik>
        </div>
    );
};

export default GeneralInfo;
