import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Col, Row } from 'antd';
import dayjs from 'dayjs';
import {
    Field, Form, Formik, FormikProps,
} from 'formik';
import { DefaultOptionType } from 'rc-select/lib/Select';
import legalIcon from 'src/common/assets/legal.svg';
import ActionButtons from 'src/common/components/action-buttons';
import DatePicker from 'src/common/components/date-picker';
import DropFileField from 'src/common/components/dropfile-field';
import FormHeader from 'src/common/components/form-header';
import SimpleField from 'src/common/components/simple-field';
import SimpleSelect from 'src/common/components/simple-select';
import { useDaDataParty } from 'src/common/hooks/dadata';
import { OpfType } from 'src/common/types/customer';
import { convertToInitialValues, convertToStoreValue } from 'src/forms/ownership-type/converter';
import { OwnershipTypeFieldModel } from 'src/forms/ownership-type/form-model';
import { ownershipScheme } from 'src/forms/ownership-type/validation';
import { FormRoutes } from 'src/forms/route-to-component-relation';
import { RootState } from 'src/store';
import { formActions } from 'src/store/reducers/form';

import './ownership-type.scss';

const OwnershipIndividualFormFragment: React.FC<FormikProps<OwnershipTypeFieldModel>> = ({
    values,
    isSubmitting,
    setFieldValue,
}) => {
    const [partyInfo, isLoading] = useDaDataParty(values?.inn, values?.opfType);

    useEffect(() => {
        setFieldValue('registrationDate', dayjs(partyInfo?.data.state.registration_date));
        setFieldValue('ogrn', partyInfo?.data.ogrn);
    }, [partyInfo]);

    return (
        <Row gutter={ [30, 15] }>
            <Col span={ 7 }>
                <SimpleField
                    name="inn"
                    label="ИНН"
                    required={ true }
                    disabled={ isSubmitting }
                    placeholder="хххххххххх"
                    maxLength={ 12 }
                    isLoading={ isLoading }
                />
            </Col>
            <Col span={ 10 }>
                <DropFileField
                    name="scanInn"
                    label="Скан ИНН"
                    required={ true }
                    disabled={ isSubmitting }
                    multiple={ true }
                />
            </Col>
            <Col span={ 7 }>
                <DatePicker
                    name="registrationDate"
                    label="Дата регистрации"
                    required={ true }
                    disabled={ isSubmitting }
                />
            </Col>
            <Col span={ 12 }>
                <SimpleField
                    name="ogrn"
                    label="ОГРНИП"
                    required={ true }
                    disabled={ isSubmitting }
                    placeholder="ххххххххххххххх"
                    maxLength={ 15 }
                />
            </Col>
            <Col span={ 12 }>
                <DropFileField
                    name="scanOgrn"
                    label="Скан ОГРНИП"
                    required={ true }
                    disabled={ isSubmitting }
                    multiple={ false }
                />
            </Col>
            <Col span={ 12 }>
                <DropFileField
                    name="scanContract"
                    label="Скан договора аренды помещения (офиса)"
                    disabled={ values.hasContract || isSubmitting }
                    multiple={ true }
                />
            </Col>
            <Col span={ 12 }>
                <DropFileField
                    name="scanEgrn"
                    label="Скан выписки из ЕГРИП (не старше 3 месяцев)"
                    required={ true }
                    disabled={ isSubmitting }
                    multiple={ true }
                />
            </Col>
            <Col>
                <Field name="hasContract">
                    { ({ field }) => (
                        <Checkbox
                            { ...field }
                            checked={ field.value }
                            className="ownership__checkbox"
                            disabled={ isSubmitting }
                        >
                            Нет договора
                        </Checkbox>
                    ) }
                </Field>
            </Col>
        </Row>
    );
};

const OwnershipLegalFormFragment: React.FC<FormikProps<OwnershipTypeFieldModel>> = ({
    values,
    isSubmitting,
    setFieldValue,
}) => {
    const [partyInfo, isLoading] = useDaDataParty(values?.inn, values?.opfType);

    useEffect(() => {
        setFieldValue('registrationDate', dayjs(partyInfo?.data.state.registration_date));
        setFieldValue('fullName', partyInfo?.data.name.full_with_opf);
        setFieldValue('shortName', partyInfo?.data.name.short_with_opf);
        setFieldValue('ogrn', partyInfo?.data.ogrn);
    }, [partyInfo]);

    return (
        <Row gutter={ [30, 15] }>
            <Col span={ 7 }>
                <SimpleField
                    name="inn"
                    label="ИНН"
                    placeholder="хххххххххх"
                    required={ true }
                    disabled={ isSubmitting }
                    isLoading={ isLoading }
                    maxLength={ 10 }
                />
            </Col>
            <Col span={ 10 }>
                <DropFileField
                    name="scanInn"
                    label="Скан ИНН"
                    multiple={ true }
                    disabled={ isSubmitting }
                    required={ true }
                />
            </Col>
            <Col span={ 7 }>
                <DatePicker
                    name="registrationDate"
                    label="Дата регистрации"
                    required={ true }
                    disabled={ isSubmitting }
                />
            </Col>
            <Col span={ 16 }>
                <SimpleField
                    name="fullName"
                    label="Название полное"
                    required={ true }
                    disabled={ isSubmitting }
                    placeholder="ООО «Московская промышленная компания»"
                />
            </Col>
            <Col span={ 8 }>
                <SimpleField
                    name="shortName"
                    label="Сокращение"
                    required={ true }
                    disabled={ isSubmitting }
                    placeholder="ООО «МПК»"
                />
            </Col>
            <Col span={ 7 }>
                <SimpleField
                    name="ogrn"
                    label="ОГРН"
                    disabled={ isSubmitting }
                    placeholder="ххххххххххххх"
                    maxLength={ 13 }
                />
            </Col>
            <Col span={ 10 }>
                <DropFileField
                    name="scanOgrn"
                    label="Скан ОГРН"
                    required={ true }
                    disabled={ isSubmitting }
                    multiple={ true }
                />
            </Col>
        </Row>
    );
};

const OwnershipType: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const opfTypeOptions: DefaultOptionType[] = [
        { value: OpfType.LEGAL, label: 'Общество с ограниченной ответственностью (ООО)' },
        { value: OpfType.INDIVIDUAL, label: 'Индивидуальный предприниматель (ИП)' },
    ];
    const handleSubmit = async (data: OwnershipTypeFieldModel): Promise<void> => {
        dispatch(formActions.setOwnershipInfo(convertToStoreValue(data)));
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigate(FormRoutes.REGISTRATION);
    };

    const handleReject = (reset) => {
        reset();
        navigate(FormRoutes.GENERAL);
    };

    return (
        <div className="ownership">
            <FormHeader
                image={ legalIcon }
                title="Форма собственности"
                description="Выберите форму собственности и заполните данные"
            />
            <Formik
                enableReinitialize={ true }
                initialValues={ convertToInitialValues(fields) }
                onSubmit={ handleSubmit }
                validationSchema={ ownershipScheme }
                validateOnBlur={ false }
            >
                { (props) => (
                    <Form>
                        <Row className="ownership__opf">
                            <Col span={ 18 }>
                                <SimpleSelect
                                    name="opfType"
                                    label="Вид деятельности "
                                    required={ true }
                                    disabled={ props.isSubmitting }
                                    options={ opfTypeOptions }
                                    placeholder="Укажите вид"
                                />
                            </Col>
                        </Row>
                        { props.values.opfType === OpfType.INDIVIDUAL && (
                            <OwnershipIndividualFormFragment { ...props } />
                        ) }
                        { props.values.opfType === OpfType.LEGAL && (
                            <OwnershipLegalFormFragment { ...props } />
                        ) }
                        <ActionButtons
                            onReject={ () => handleReject(props.resetForm) }
                            isLoading={ props.isSubmitting }
                        />
                    </Form>
                ) }
            </Formik>
        </div>
    );
};

export default OwnershipType;
