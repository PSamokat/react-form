import React from 'react';
import { useSelector } from 'react-redux';
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
import { RootState } from 'src/store';

import './residential-address.scss';

const ResidentialFormFragment: React.FC<FormikProps<ResidentialAddressFieldsModel>> = ({
    values,
    isSubmitting,
}) => {
    const [countrySuggestion, isCountriesLoading] = useDaDataCountries(
        values.country?.value,
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
                <Col span={ 24 }>
                    <Field name="registrationMatch">
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
                        disabled={ isSubmitting }
                        placeholder="Страна проживания"
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
                <Col span={ 6 } className="residential-address__apartment">
                    <Field name="hasNoApartment">
                        { ({ field }) => (
                            <Checkbox
                                { ...field }
                                checked={ field.value }
                                disabled={ isSubmitting }
                                className="residential-address__checkbox"
                            >
                                Нет квартиры
                            </Checkbox>
                        ) }
                    </Field>
                </Col>
            </Row>
            <ActionButtons />
        </Form>
    );
};

const ResidentialAddress: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const handleSubmit = async (value: ResidentialAddressFieldsModel): Promise<void> => {
        console.log(value);
        await new Promise((resolve) => setTimeout(resolve, 800));
    };

    return (
        <div className="residential-address">
            <FormHeader
                image={ homeIcon }
                title="Адрес проживания"
                description="Введите свой действующий адресс проживания"
            />
            <Formik initialValues={ convertToInitialValues(fields) } onSubmit={ handleSubmit }>
                { (props) => <ResidentialFormFragment { ...props } /> }
            </Formik>
        </div>
    );
};

export default ResidentialAddress;
