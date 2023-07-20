import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Col, Row } from 'antd';
import {
    Field, Form, Formik, FormikProps,
} from 'formik';
import homeIcon from 'src/common/assets/home.svg';
import ActionButtons from 'src/common/components/action-buttons';
import DatePicker from 'src/common/components/date-picker';
import FormHeader from 'src/common/components/form-header';
import SearchSelect from 'src/common/components/search-select';
import SimpleField from 'src/common/components/simple-field';
import { useDaDataAddress, useDaDataCountries } from 'src/common/hooks/dadata';
import { DaDataGranularType } from 'src/common/types/dadata';
import { convertToInitialValues } from 'src/forms/registration-address/converter';
import { RegistrationAddressFieldsModel } from 'src/forms/registration-address/form-model';
import { FormRoutes } from 'src/forms/route-to-component-relation';
import { RootState } from 'src/store';
import { formActions } from 'src/store/reducers/form';

import './registration-address.scss';

const RegisrtationFormFragment: React.FC<FormikProps<RegistrationAddressFieldsModel>> = ({ values, isSubmitting }) => {
    const [countrySuggestion, isCountriesLoading] = useDaDataCountries(
        values.country.value,
    );
    const [regionSuggestion, isRegionsLoading] = useDaDataAddress(
        values.region?.value,
        DaDataGranularType.REGION,
        values.country?.value,
    );
    const [citySuggestion, isCitiesLoading] = useDaDataAddress(
        values.city?.value,
        DaDataGranularType.CITY,
        values.country?.value,
        values.region?.dadataObj.fias_id,
    );
    const [streetSuggestion, isStreetsLoading] = useDaDataAddress(
        values.street?.value,
        DaDataGranularType.STREET,
        values.country?.value,
        values.city?.dadataObj.fias_id,
    );
    const [houseSuggestion, isHousesLoading] = useDaDataAddress(
        values.house?.value,
        DaDataGranularType.HOUSE,
        values.country?.value,
        values.street?.dadataObj.fias_id,
    );

    return (
        <Form>
            <Row gutter={ [30, 10] }>
                <Col span={ 12 }>
                    <SearchSelect
                        name="country "
                        label="Страна"
                        required={ true }
                        disabled={ isSubmitting }
                        placeholder="Страна регистрации"
                        isFetching={ isCountriesLoading }
                        options={ countrySuggestion }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="region"
                        label="Регион"
                        required={ true }
                        disabled={ isSubmitting }
                        placeholder="Регион"
                        isFetching={ isRegionsLoading }
                        options={ regionSuggestion }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="city"
                        label="Город / Населенный пункт"
                        required={ true }
                        disabled={ isSubmitting }
                        placeholder="Город или населенный пункт"
                        isFetching={ isCitiesLoading }
                        options={ citySuggestion }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="street"
                        label="Улица"
                        required={ true }
                        disabled={ isSubmitting }
                        placeholder="Улица"
                        isFetching={ isStreetsLoading }
                        options={ streetSuggestion }
                    />
                </Col>
                <Col span={ 3 }>
                    <SearchSelect
                        name="house"
                        label="Дом"
                        required={ true }
                        disabled={ isSubmitting }
                        placeholder={ 0 }
                        isFetching={ isHousesLoading }
                        options={ houseSuggestion }
                    />
                </Col>
                <Col span={ 3 }>
                    <SimpleField
                        name="apartment"
                        label="Квартира"
                        required={ true }
                        disabled={ values.hasNoApartment }
                        placeholder="0"
                    />
                </Col>
                <Col span={ 6 } className="registration-address__apartment">
                    <Field name="hasNoApartment">
                        { ({ field }) => (
                            <Checkbox
                                { ...field }
                                checked={ field.value }
                                disabled={ isSubmitting }
                                className="registration-address__checkbox"
                            >
                                Нет квартиры
                            </Checkbox>
                        ) }
                    </Field>
                </Col>
                <Col span={ 6 }>
                    <DatePicker
                        name="registrationDate"
                        label="Дата прописки"
                        required={ true }
                        disabled={ isSubmitting }
                    />
                </Col>
            </Row>
            <ActionButtons />
        </Form>
    );
};

const RegistrationAddress: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (data: RegistrationAddressFieldsModel): Promise<void> => {
        dispatch(formActions.setRegistrationAddress(data));
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigate(FormRoutes.RESIDENTIAL);
    };

    return (
        <div className="registration-address">
            <FormHeader
                image={ homeIcon }
                title="Адрес регистрации"
                description="Введите свой действующий адресс прописки"
            />
            <Formik initialValues={ convertToInitialValues(fields) } onSubmit={ handleSubmit }>
                { (props) => <RegisrtationFormFragment { ...props } /> }
            </Formik>
        </div>
    );
};

export default RegistrationAddress;
