import { SchemaObject } from 'src/common/types/common';
import { dadataAddressSchema, dadataCountrySchema } from 'src/common/utils/yup-schemas';
import { RegistrationAddressFieldsModel } from 'src/forms/registration-address/form-model';
import {
    boolean, date, object, string,
} from 'yup';

export const registrationAddressFieldsSchema = object().shape<SchemaObject<RegistrationAddressFieldsModel>>({
    country: dadataCountrySchema(),
    region: dadataAddressSchema(),
    city: dadataAddressSchema(),
    street: dadataAddressSchema(),
    house: dadataAddressSchema(),
    apartment: string().when('hasNoApartment', {
        is: false,
        then: (schema) => schema.required('Заполните поле'),
    }),
    registrationDate: date().required('Обязательное поле'),
    hasNoApartment: boolean(),
});
