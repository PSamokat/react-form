import { Gender } from 'src/common/types/customer';
import * as Yup from 'yup';

import type { GeneralInfoFieldsModel } from './form-model';

export const generalInfoScheme = Yup.object<GeneralInfoFieldsModel>({
    firstName: Yup.string().required('Обязательное поле'),
    surName: Yup.string().required('Обязательное поле'),
    lastName: Yup.string().required('Обязательное поле'),
    city: Yup.string().required('Обязательное поле'),
    citizenship: Yup.string().required('Обязательное поле'),
    birthDate: Yup.date().required('Обязательное поле'),
    birthPlace: Yup.string().required('Обязательное поле'),
    gender: Yup.mixed<Gender>().oneOf(Object.values(Gender)).required('Укажите пол'),
});
