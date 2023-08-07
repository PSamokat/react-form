import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FieldArray, Form, Formik } from 'formik';
import socialIcon from 'src/common/assets/communication.svg';
import addIcon from 'src/common/assets/math-plus.svg';
import ActionButtons from 'src/common/components/action-buttons';
import FieldError from 'src/common/components/field-error';
import FormHeader from 'src/common/components/form-header';
import SocialSelect from 'src/common/components/social-select';
import { FormRoutes } from 'src/forms/route-to-component-relation';
import { convertToInitialValues } from 'src/forms/social-medias/converter';
import { SocialMediasFieldsModel } from 'src/forms/social-medias/form-model';
import { socialMediasFieldsSchema } from 'src/forms/social-medias/validation';
import { RootState } from 'src/store';
import { socialMediaOptions } from 'src/store/constants';
import { formActions } from 'src/store/reducers/form';

import './socials-medias.scss';

const SocialMedias: React.FC = () => {
    const fields = useSelector((state: RootState) => state.form);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (data: SocialMediasFieldsModel): Promise<void> => {
        dispatch(formActions.setSocialMedia(data));
        await new Promise((resolve) => setTimeout(resolve, 800));
        dispatch(formActions.sendForm());
    };

    const handleReject = (reset) => {
        reset();
        navigate(FormRoutes.RESIDENTIAL);
    };

    return (
        <div className="social-medias">
            <FormHeader
                image={ socialIcon }
                title="Социальные сети"
                description="Введите свои действуйющие ссылки на социальные сети"
            />
            <Formik
                initialValues={ convertToInitialValues(fields) }
                onSubmit={ handleSubmit }
                validationSchema={ socialMediasFieldsSchema }
                validateOnBlur={ false }
            >
                { ({
                    isSubmitting, resetForm, values, errors,
                }) => (
                    <Form>
                        <FieldArray name="socials">
                            { (arrayHelper) => (
                                <React.Fragment>
                                    <div className="social-medias__fields">
                                        { values.socials.map((_, index) => (
                                            <SocialSelect
                                                key={ index }
                                                label="Сайт / Приложение"
                                                required={ true }
                                                disabled={ isSubmitting }
                                                selectName={ `socials.${index}.platformName` }
                                                inputName={ `socials.${index}.url` }
                                                selectProps={ { options: socialMediaOptions } }
                                                onDelete={ () => arrayHelper.remove(index) }
                                            />
                                        )) }
                                    </div>
                                    { typeof errors.socials === 'string' && (
                                        <FieldError errorMessage={ errors.socials } />
                                    ) }
                                    <Button
                                        type="link"
                                        className="social-medias__add"
                                        disabled={ isSubmitting }
                                        onClick={ () =>
                                            arrayHelper.push({ name: undefined, url: undefined }) }
                                    >
                                        <img
                                            className="social-medias__add-icon"
                                            src={ addIcon }
                                            alt="add"
                                        />
                                        <div>Добавить социальную сеть</div>
                                    </Button>
                                </React.Fragment>
                            ) }
                        </FieldArray>
                        <ActionButtons
                            onReject={ () => handleReject(resetForm) }
                            isLoading={ isSubmitting }
                            acceptText="Сохранить"
                        />
                    </Form>
                ) }
            </Formik>
        </div>
    );
};

export default SocialMedias;
