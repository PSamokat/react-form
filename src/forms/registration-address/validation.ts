import { SchemaObject } from 'src/common/types/common';
import { dadataAddressScheme, dadataCountryScheme } from 'src/common/utils/yup';
import { RegistrationAddressFieldsModel } from 'src/forms/registration-address/form-model';
import {
    boolean, date, object, string,
} from 'yup';

export const registrationAddressFieldsSchema = object().shape<SchemaObject<RegistrationAddressFieldsModel>>({
    country: dadataCountryScheme(),
    region: dadataAddressScheme(),
    city: dadataAddressScheme(),
    street: dadataAddressScheme(),
    house: dadataAddressScheme(),
    apartment: string().when('hasNoApartment', {
        is: false,
        then: (schema) => schema.required('Заполните поле'),
    }),
    registrationDate: date().required('Обязательное поле'),
    hasNoApartment: boolean(),
});
