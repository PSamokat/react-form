import { SchemaObject } from 'src/common/types/common';
import { Gender } from 'src/common/types/customer';
import { dadataAddressScheme, dadataCountryScheme } from 'src/common/utils/yup';
import {
    date, mixed, object, string,
} from 'yup';

import type { GeneralInfoFieldsModel } from './form-model';

export const generalInfoScheme = object().shape<SchemaObject<GeneralInfoFieldsModel>>({
    firstName: string().required('Обязательное поле'),
    surName: string().required('Обязательное поле'),
    lastName: string().required('Обязательное поле'),
    city: dadataAddressScheme(),
    citizenship: dadataCountryScheme(),
    birthDate: date().required('Обязательное поле'),
    birthPlace: string().required('Обязательное поле'),
    gender: mixed<Gender>().oneOf(Object.values(Gender)).required('Укажите пол'),
});
