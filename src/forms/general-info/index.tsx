import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Form, Formik } from 'formik';
import generalIcon from 'src/common/assets/general-icon.svg';
import ActionButtons from 'src/common/components/action-buttons';
import DatePicker from 'src/common/components/date-picker';
import FormHeader from 'src/common/components/form-header';
import GenderSwitch from 'src/common/components/gender-switch';
import SearchSelect from 'src/common/components/search-select';
import SimpleField from 'src/common/components/simple-field';
import { DaDataGranularType } from 'src/common/types/dadata';
import type { RootState } from 'src/store';
import { addressSuggestActions } from 'src/store/reducers/address-suggestion';
import { countrySuggestionActions } from 'src/store/reducers/country-suggestion';
import { formActions } from 'src/store/reducers/form';

import { FormRoutes } from '../route-to-component-relation';

import { convertToInitialValues } from './converter';
import type { GeneralInfoFieldsModel } from './form-model';
import { generalInfoScheme } from './validation';

import './general-info.scss';

const GeneralInfo: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const addressSuggestions = useSelector(
        (state: RootState) => state.addressSuggestion,
    );
    const countrySuggestions = useSelector((state: RootState) => state.countrySuggestion);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (value: GeneralInfoFieldsModel): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        dispatch(formActions.setGeneralInfo(value));
        navigate(FormRoutes.OWNERSHIP);
    };
    const handleCountrySuggestion = (query: string) => {
        dispatch(countrySuggestionActions.getCountriesSuggestions(query));
    };

    const handleCitySuggestion = (query: string) => {
        dispatch(addressSuggestActions.getAddressSuggestions({
            query,
            from_bound: { value: DaDataGranularType.CITY },
            to_bound: { value: DaDataGranularType.CITY },
        }));
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
            >
                { (props) => (
                    <Form>
                        <Row gutter={ [30, 10] }>
                            <Col span={ 12 }>
                                <SimpleField
                                    name="firstName"
                                    placeholder="Иван"
                                    label="Имя"
                                    disabled={ props.isSubmitting }
                                    required={ true }
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SimpleField
                                    name="surName"
                                    placeholder="Иванович"
                                    label="Отчество"
                                    disabled={ props.isSubmitting }
                                    required={ true }
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SimpleField
                                    name="lastName"
                                    placeholder="Иванов"
                                    label="Фамилия"
                                    disabled={ props.isSubmitting }
                                    required={ true }
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SearchSelect
                                    name="city"
                                    required={ true }
                                    disabled={ props.isSubmitting }
                                    label="Основной город"
                                    placeholder="Город"
                                    getOptions={ handleCitySuggestion }
                                    isFetching={ addressSuggestions.isFetching }
                                    options={ addressSuggestions.data }
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SearchSelect
                                    name="citizenship"
                                    required={ true }
                                    label="Гражданство"
                                    disabled={ props.isSubmitting }
                                    placeholder="Страна"
                                    getOptions={ handleCountrySuggestion }
                                    isFetching={ countrySuggestions.isFetching }
                                    options={ countrySuggestions.countries }
                                />
                            </Col>
                            <Col span={ 6 }>
                                <GenderSwitch
                                    name="gender"
                                    required={ true }
                                    disabled={ props.isSubmitting }
                                />
                            </Col>
                            <Col span={ 6 }>
                                <DatePicker
                                    name="birthDate"
                                    disabled={ props.isSubmitting }
                                    required={ true }
                                    label="Дата рождения"
                                />
                            </Col>
                            <Col span={ 24 }>
                                <SimpleField
                                    name="birthPlace"
                                    label="Место рождения (как указано в паспорте)"
                                    required={ true }
                                    disabled={ props.isSubmitting }
                                    placeholder="Введите наименование региона и населенного пункта"
                                />
                            </Col>
                        </Row>
                        <ActionButtons
                            onReject={ props.resetForm }
                            isLoading={ props.isSubmitting }
                            acceptText="Далее"
                            rejectText="Отмена"
                        />
                    </Form>
                ) }
            </Formik>
        </div>
    );
};

export default GeneralInfo;
