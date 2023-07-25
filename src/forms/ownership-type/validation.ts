import { OpfType } from 'src/common/types/customer';
import { OwnershipTypeFieldModel } from 'src/forms/ownership-type/form-model';
import * as Yup from 'yup';

export const ownershipScheme = Yup.object<OwnershipTypeFieldModel>({
    opfType: Yup.string().required('Выберите форму'),
    inn: Yup.string().when('opfType', {
        is: OpfType.INDIVIDUAL,
        then: (schema) => schema.matches(/^[\d+]{12}$/, 'ИНН состоит из 12 цифр'),
        otherwise: (schema) => schema.matches(/^[\d+]{10}$/, 'ИНН состоит из 10 цифр'),
    }).required('Обязательное поле'),
    ogrn: Yup.string().when('opfType', {
        is: OpfType.INDIVIDUAL,
        then: (schema) => schema.matches(/^[\d+]{15}$/, 'ОГРН состоит из 15 цифр'),
        otherwise: (schema) => schema.matches(/^[\d+]{13}$/, 'ОГРН состоит из 13 цифр'),
    }).required('Обязательное поле'),
    registrationDate: Yup.date().required('Обязательное поле'),
    hasContract: Yup.boolean(),
    fullName: Yup.string().required('Обязательное поле'),
    shortName: Yup.string().required('Обязательное поле'),
});
