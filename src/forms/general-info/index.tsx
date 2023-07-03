import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Form, Formik } from 'formik';
import generalIcon from 'src/common/assets/general-icon.svg';
import ActionButtons from 'src/common/components/action-buttons';
import DatePicker from 'src/common/components/date-picker';
import FormHeader from 'src/common/components/form-header';
import GenderSwitch from 'src/common/components/gender-switch';
import SimpleField from 'src/common/components/simple-field';
import SimpleSelect from 'src/common/components/simple-select';
import type { RootState } from 'Src/store';

import { FormRoutes } from '../route-to-component-relation';

import { convertToInitialValues } from './converter';
import type { GeneralInfoFieldsModel } from './form-model';
import { generalInfoScheme } from './validation';

import './general-info.scss';

const GeneralInfo: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const navigate = useNavigate();
    const optionsCity = [
        { value: 'Москва', label: 'Москва' },
        { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
        { value: 'Екатеринбург', label: 'Екатеринбург' },
        { value: 'Оренбург', label: 'Оренбург' },
    ];
    const optionsCitizenship = [
        { value: 'Россия', label: 'Россия' },
        { value: 'Беларусь', label: 'Беларусь' },
        { value: 'Казахстан', label: 'Казахстан' },
    ];
    const submitHandler = async (value: GeneralInfoFieldsModel): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(value);
        navigate(FormRoutes.OWNERSHIP);
    };

    return (
        <div className="general-info">
            <FormHeader
                image={ generalIcon }
                title="Общие"
                description="Введите свои персональные данные."
            />
            <Formik
                initialValues={ convertToInitialValues(fields) }
                onSubmit={ submitHandler }
                validationSchema={ generalInfoScheme }
            >
                { (props) => (
                    <Form>
                        <Row gutter={ [40, 10] }>
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
                                <SimpleSelect
                                    options={ optionsCity }
                                    name="city"
                                    required={ true }
                                    disabled={ props.isSubmitting }
                                    label="Основной город"
                                    placeholder="Город"
                                />
                            </Col>
                            <Col span={ 12 }>
                                <SimpleSelect
                                    options={ optionsCitizenship }
                                    name="citizenship"
                                    required={ true }
                                    disabled={ props.isSubmitting }
                                    label="Гражданство"
                                    placeholder="Страна"
                                />
                            </Col>
                            <Col span={ 6 }>
                                <GenderSwitch name="gender" required={ true } />
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
