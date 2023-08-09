import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Col, Row } from 'antd';
import {
    Field, Form, Formik, FormikProps,
} from 'formik';
import homeIcon from 'src/common/assets/home.svg';
import ActionButtons from 'src/common/components/action-buttons';
import FormHeader from 'src/common/components/form-header';
import SearchSelect from 'src/common/components/search-select';
import SimpleField from 'src/common/components/simple-field';
import { useDaDataAddress, useDaDataCountries } from 'src/common/hooks/dadata';
import { DaDataGranularType } from 'src/common/types/dadata';
import { convertToInitialValues } from 'src/forms/residential-address/converter';
import { ResidentialAddressFieldsModel } from 'src/forms/residential-address/form-model';
import { residentialAddressFieldsSchema } from 'src/forms/residential-address/validation';
import { FormRoutes } from 'src/forms/route-to-component-relation';
import { RootState } from 'src/store';
import { formActions } from 'src/store/reducers/form';

import './residential-address.scss';

const ResidentialFormFragment: React.FC<FormikProps<ResidentialAddressFieldsModel>> = ({
    values,
    isSubmitting,
    setFieldValue,
}) => {
    const [countrySuggestion, isCountriesLoading] = useDaDataCountries(values.country?.value);

    const [regionSuggestion, isRegionsLoading] = useDaDataAddress(
        values?.region?.value,
        DaDataGranularType.REGION,
        values?.country?.value,
    );
    const [citySuggestion, isCitiesLoading] = useDaDataAddress(
        values?.city?.value,
        DaDataGranularType.CITY,
        values?.country?.value,
        values?.region?.dadataObj.fias_id,
    );
    const [streetSuggestion, isStreetsLoading] = useDaDataAddress(
        values?.street?.value,
        DaDataGranularType.STREET,
        values?.country?.value,
        values?.city?.dadataObj.fias_id,
    );
    const [houseSuggestion, isHousesLoading] = useDaDataAddress(
        values?.house?.value,
        DaDataGranularType.HOUSE,
        values?.country?.value,
        values?.street?.dadataObj.fias_id,
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
                <Col span={ 24 }>
                    <Field name="addressMatches">
                        { ({ field }) => (
                            <Checkbox
                                { ...field }
                                checked={ field.value }
                                disabled={ isSubmitting }
                                className="residential-address__match"
                            >
                                Адрес регистрации и фактического проживания совпадают
                            </Checkbox>
                        ) }
                    </Field>
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="country"
                        label="Страна"
                        required={ true }
                        disabled={ isSubmitting || values.addressMatches }
                        placeholder="Страна проживания"
                        isFetching={ isCountriesLoading }
                        options={ countrySuggestion }
                        onSearch={ (value) => handleOnSearch('country', value) }
                        onChange={ (value, option) => handleOnChangeValue('country', value, option) }
                        onSelect={ (value, option) => handleOnChangeValue('country', value, option) }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="region"
                        label="Регион"
                        required={ true }
                        disabled={ isSubmitting || values.addressMatches }
                        placeholder="Регион"
                        isFetching={ isRegionsLoading }
                        options={ regionSuggestion }
                        onSearch={ (value) => handleOnSearch('region', value) }
                        onChange={ (value, option) => handleOnChangeValue('region', value, option) }
                        onSelect={ (value, option) => handleOnChangeValue('region', value, option) }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="city"
                        label="Город / Населенный пункт"
                        required={ true }
                        disabled={ isSubmitting || values.addressMatches }
                        placeholder="Город или населенный пункт"
                        isFetching={ isCitiesLoading }
                        options={ citySuggestion }
                        onSearch={ (value) => handleOnSearch('city', value) }
                        onChange={ (value, option) => handleOnChangeValue('city', value, option) }
                        onSelect={ (value, option) => handleOnChangeValue('city', value, option) }
                    />
                </Col>
                <Col span={ 12 }>
                    <SearchSelect
                        name="street"
                        label="Улица"
                        required={ true }
                        disabled={ isSubmitting || values.addressMatches }
                        placeholder="Улица"
                        isFetching={ isStreetsLoading }
                        options={ streetSuggestion }
                        onSearch={ (value) => handleOnSearch('street', value) }
                        onChange={ (value, option) => handleOnChangeValue('street', value, option) }
                        onSelect={ (value, option) => handleOnChangeValue('street', value, option) }
                    />
                </Col>
                <Col span={ 3 }>
                    <SearchSelect
                        name="house"
                        label="Дом"
                        required={ true }
                        disabled={ isSubmitting || values.addressMatches }
                        placeholder={ 0 }
                        isFetching={ isHousesLoading }
                        options={ houseSuggestion }
                        onSearch={ (value) => handleOnSearch('house', value) }
                        onChange={ (value, option) => handleOnChangeValue('house', value, option) }
                        onSelect={ (value, option) => handleOnChangeValue('house', value, option) }
                    />
                </Col>
                <Col span={ 3 }>
                    <SimpleField
                        name="apartment"
                        label="Квартира"
                        required={ true }
                        disabled={ isSubmitting || values.hasNoApartment || values.addressMatches }
                        placeholder="0"
                    />
                </Col>
                <Col span={ 6 } className="residential-address__apartment">
                    <Field name="hasNoApartment">
                        { ({ field }) => (
                            <Checkbox
                                { ...field }
                                checked={ field.value }
                                disabled={ isSubmitting || values.addressMatches }
                                className="residential-address__checkbox"
                            >
                                Нет квартиры
                            </Checkbox>
                        ) }
                    </Field>
                </Col>
            </Row>
        </Form>
    );
};

const ResidentialAddress: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (data: ResidentialAddressFieldsModel): Promise<void> => {
        if (data.addressMatches) {
            dispatch(formActions.setAddressMatches());
        } else {
            dispatch(formActions.setResidentialAddress(data));
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigate(FormRoutes.SOCIALS);
    };
    const handleReject = (reset) => {
        reset();
        navigate(FormRoutes.REGISTRATION);
    };

    return (
        <div className="residential-address">
            <FormHeader
                image={ homeIcon }
                title="Адрес проживания"
                description="Введите свой действующий адресс проживания"
            />
            <Formik
                initialValues={ convertToInitialValues(fields) }
                onSubmit={ handleSubmit }
                validationSchema={ residentialAddressFieldsSchema }
                validateOnBlur={ false }
            >
                { (props) => (
                    <React.Fragment>
                        <ResidentialFormFragment { ...props } />
                        <ActionButtons
                            onAccept={ props.handleSubmit }
                            onReject={ () => handleReject(props.resetForm) }
                            isLoading={ props.isSubmitting }
                        />
                    </React.Fragment>
                ) }
            </Formik>
        </div>
    );
};

export default ResidentialAddress;
