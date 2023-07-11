import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Col, Row } from 'antd';
import { Field, Form, Formik } from 'formik';
import { DefaultOptionType } from 'rc-select/lib/Select';
import legalIcon from 'src/common/assets/legal.svg';
import ActionButtons from 'src/common/components/action-buttons';
import DatePicker from 'src/common/components/date-picker';
import DropFileField from 'src/common/components/dropfile-field';
import FormHeader from 'src/common/components/form-header';
import SimpleField from 'src/common/components/simple-field';
import SimpleSelect from 'src/common/components/simple-select';
import { OpfType } from 'src/common/types/customer';
import { convertToInitialValues } from 'src/forms/ownership-type/converter';
import { OwnershipTypeFieldModel } from 'src/forms/ownership-type/form-model';
import { ownershipTypeScheme } from 'src/forms/ownership-type/validation';
import { FormRoutes } from 'src/forms/route-to-component-relation';
import { RootState } from 'src/store';
import { suggestionActions } from 'src/store/reducers/dadata';
import { formActions } from 'src/store/reducers/form';

import './ownership-type.scss';

const OwnershipType: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const isFetching = useSelector(
        (state: RootState) => state.suggestions.legalInfoSuggest.isFetching,
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const opfTypeOptions: DefaultOptionType[] = [
        { value: OpfType.LEGAL, label: 'Общество с ограниченной ответственностью (ООО)' },
        { value: OpfType.INDIVIDUAL, label: 'Индивидуальный предприниматель (ИП)' },
    ];
    const searchPartyInfoHandler = (querySearch: string, type: OpfType) => {
        dispatch(suggestionActions.getPartyInfo({ querySearch, type }));
    };
    const submitHandler = async (data: OwnershipTypeFieldModel): Promise<void> => {
        dispatch(formActions.setOwnershipInfo(data));
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigate(FormRoutes.REGISTRATION);
    };

    const rejectHandler = () => {
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
                onSubmit={ submitHandler }
                validationSchema={ ownershipTypeScheme }
            >
                { (props) => (
                    <Form onSubmit={ props.handleSubmit }>
                        <Row>
                            <Col span={ 18 }>
                                <SimpleSelect
                                    name="opfType"
                                    label="Вид деятельности"
                                    required={ true }
                                    disabled={ props.isSubmitting }
                                    options={ opfTypeOptions }
                                    placeholder="Укажите вид"
                                />
                            </Col>
                        </Row>
                        { props.values.opfType === OpfType.INDIVIDUAL && (
                            <Row gutter={ [30, 10] }>
                                <Col span={ 7 }>
                                    <SimpleField
                                        name="inn"
                                        label="ИНН"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                        placeholder="хххххххххх"
                                        maxLength={ 12 }
                                    />
                                </Col>
                                <Col span={ 10 }>
                                    <DropFileField
                                        label="Скан ИНН"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                    />
                                </Col>
                                <Col span={ 7 }>
                                    <DatePicker
                                        name="registrationDate"
                                        label="Дата регистрации"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                    />
                                </Col>
                                <Col span={ 12 }>
                                    <SimpleField
                                        name="ogrn"
                                        label="ОГРНИП"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                        placeholder="ххххххххххххххх"
                                        maxLength={ 15 }
                                    />
                                </Col>
                                <Col span={ 12 }>
                                    <DropFileField
                                        label="Скан ОГРНИП"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                    />
                                </Col>
                                <Col span={ 12 }>
                                    <DropFileField
                                        label="Скан договора аренды помещения (офиса)"
                                        disabled={ props.values.hasContract || props.isSubmitting }
                                    />
                                </Col>
                                <Col span={ 12 }>
                                    <DropFileField
                                        label="Скан выписки из ЕГРИП (не старше 3 месяцев)"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                    />
                                </Col>
                                <Col>
                                    <Field
                                        name="hasContract"
                                        render={ ({ field }) => (
                                            <Checkbox
                                                { ...field }
                                                className="ownership__contract"
                                                disabled={ props.isSubmitting }
                                            >
                                                Нет договора
                                            </Checkbox>
                                        ) }
                                    />
                                </Col>
                            </Row>
                        ) }
                        { props.values.opfType === OpfType.LEGAL && (
                            <Row gutter={ [30, 10] }>
                                <Col span={ 7 }>
                                    <SimpleField
                                        name="inn"
                                        label="ИНН"
                                        placeholder="хххххххххх"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                        onSearch={ (query) =>
                                            searchPartyInfoHandler(query, props.values.opfType) }
                                        isLoading={ isFetching }
                                        maxLength={ 10 }
                                    />
                                </Col>
                                <Col span={ 10 }>
                                    <DropFileField
                                        label="Скан ИНН"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                    />
                                </Col>
                                <Col span={ 7 }>
                                    <DatePicker
                                        name="registrationDate"
                                        label="Дата регистрации"
                                        required={ true }
                                        disabled={ props.isSubmitting }

                                    />
                                </Col>
                                <Col span={ 16 }>
                                    <SimpleField
                                        name="fullName"
                                        label="Название полное"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                        placeholder="ООО «Московская промышленная компания»"
                                    />
                                </Col>
                                <Col span={ 8 }>
                                    <SimpleField
                                        name="shortName"
                                        label="Сокращение"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                        placeholder="ООО «МПК»"
                                    />
                                </Col>
                                <Col span={ 7 }>
                                    <SimpleField
                                        name="ogrn"
                                        label="ОГРН"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                        placeholder="ххххххххххххх"
                                        maxLength={ 13 }
                                    />
                                </Col>
                                <Col span={ 10 }>
                                    <DropFileField
                                        label="Скан ОГРН"
                                        required={ true }
                                        disabled={ props.isSubmitting }
                                    />
                                </Col>
                            </Row>
                        ) }
                        <ActionButtons
                            onReject={ rejectHandler }
                            isLoading={ props.isSubmitting }
                            acceptText="Далее"
                            rejectText="Назад"
                        />
                    </Form>
                ) }
            </Formik>
        </div>
    );
};

export default OwnershipType;
