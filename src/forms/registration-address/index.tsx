import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Col, Row } from 'antd';
import {
    Field, Form, Formik, FormikContextType,
} from 'formik';
import homeIcon from 'src/common/assets/home.svg';
import ActionButtons from 'src/common/components/action-buttons';
import DatePicker from 'src/common/components/date-picker';
import FormHeader from 'src/common/components/form-header';
import SearchSelect from 'src/common/components/search-select';
import SimpleField from 'src/common/components/simple-field';
import { DaDataGranularType } from 'src/common/types/dadata';
import { convertToInitialValues } from 'src/forms/registration-address/converter';
import { RegistrationAddressFieldsModel } from 'src/forms/registration-address/form-model';
import { RootState } from 'src/store';
import { addressSuggestActions } from 'src/store/reducers/address-suggestion';
import { countrySuggestionActions } from 'src/store/reducers/country-suggestion';

import './registration-address.scss';

const RegistrationAddress: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const countrySuggestions = useSelector((state: RootState) => state.countrySuggestion);
    const addressSuggestions = useSelector((state: RootState) => state.addressSuggestion);
    const dispatch = useDispatch();

    const handleSubmit = async (value: RegistrationAddressFieldsModel): Promise<void> => {
        console.log(value);
        await new Promise((resolve) => setTimeout(resolve, 800));
    };
    const handleCountrySuggestion = (query: string) => {
        dispatch(countrySuggestionActions.getCountriesSuggestions(query));
    };
    const handleRegionSuggestion = (
        query: string,
        formikContext: FormikContextType<RegistrationAddressFieldsModel>,
    ) => {
        dispatch(
            addressSuggestActions.getAddressSuggestions({
                query,
                country: formikContext.values.country,
                from_bound: { value: DaDataGranularType.REGION },
                to_bound: { value: DaDataGranularType.REGION },
            }),
        );
    };

    const handleCitySuggestion = (
        query: string,
        formikContext: FormikContextType<RegistrationAddressFieldsModel>,
    ) => {
        dispatch(
            addressSuggestActions.getAddressSuggestions({
                query,
                country: formikContext.values.country,
                region: formikContext.values.region,
                from_bound: { value: DaDataGranularType.CITY },
                to_bound: { value: DaDataGranularType.SETTLEMENT },
            }),
        );
    };

    return (
        <div className="registration-address">
            <FormHeader
                image={ homeIcon }
                title="Адрес регистрации"
                description="Введите свой действующий адресс прописки"
            />
            <Formik initialValues={ convertToInitialValues(fields) } onSubmit={ handleSubmit }>
                { ({ values, isSubmitting }) => (
                    <Form>
                        <Row gutter={ [30, 10] }>
                            <Col span={ 12 }>
                                <SearchSelect
                                    name="country"
                                    label="Страна"
                                    required={ true }
                                    disabled={ isSubmitting }
                                    placeholder="Страна регистрации"
                                    getOptions={ handleCountrySuggestion }
                                    isFetching={ countrySuggestions.isFetching }
                                    options={ countrySuggestions.countries }
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SearchSelect
                                    name="region"
                                    label="Регион"
                                    required={ true }
                                    disabled={ isSubmitting }
                                    placeholder="Регион"
                                    getOptions={ handleRegionSuggestion }
                                    options={ addressSuggestions.data }
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SearchSelect
                                    name="city"
                                    label="Город / Населенный пункт"
                                    required={ true }
                                    disabled={ isSubmitting }
                                    placeholder="Введите населенный пункт"
                                    getOptions={ handleCitySuggestion }
                                    options={ addressSuggestions.data }
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SimpleField name="street" />
                            </Col>
                            <Col span={ 3 }>
                                <SimpleField name="house" />
                            </Col>
                            <Col span={ 3 }>
                                <SimpleField name="apartment" disabled={ values.hasNoApartment } />
                            </Col>
                            <Col span={ 6 }>
                                <Field
                                    name="hasNoApartment"
                                    render={ ({ field }) => (
                                        <Checkbox { ...field } disabled={ isSubmitting }>
                                            Нет договора
                                        </Checkbox>
                                    ) }
                                />
                            </Col>
                            <Col span={ 8 }>
                                <DatePicker name="registrationDate" />
                            </Col>
                        </Row>
                        <ActionButtons />
                    </Form>
                ) }
            </Formik>
        </div>
    );
};

export default RegistrationAddress;
