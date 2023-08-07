import { SchemaObject } from 'src/common/types/common';
import { OpfType } from 'src/common/types/customer';
import { fileCheckScheme } from 'src/common/utils/yup';
import { OwnershipTypeFieldModel } from 'src/forms/ownership-type/form-model';
import {
    boolean, date, mixed, object, string,
} from 'yup';

export const ownershipScheme = object().shape<SchemaObject<OwnershipTypeFieldModel>>({
    opfType: string().required('Выберите форму'),
    inn: string()
        .when('opfType', {
            is: OpfType.INDIVIDUAL,
            then: (schema) => schema.matches(/^[\d+]{12}$/, 'ИНН состоит из 12 цифр'),
            otherwise: (schema) => schema.matches(/^[\d+]{10}$/, 'ИНН состоит из 10 цифр'),
        })
        .required('Обязательное поле'),
    ogrn: string()
        .when('opfType', {
            is: OpfType.INDIVIDUAL,
            then: (schema) => schema.matches(/^[\d+]{15}$/, 'ОГРН состоит из 15 цифр'),
            otherwise: (schema) => schema.matches(/^[\d+]{13}$/, 'ОГРН состоит из 13 цифр'),
        })
        .required('Обязательное поле'),
    registrationDate: date().required('Обязательное поле'),
    hasContract: boolean(),
    fullName: string().when('opfType', {
        is: OpfType.LEGAL,
        then: (schema) => schema.required('Обязательное поле'),
    }),
    shortName: string().when('opfType', {
        is: OpfType.LEGAL,
        then: (schema) => schema.required('Обязательное поле'),
    }),
    scanInn: fileCheckScheme(),
    scanOgrn: fileCheckScheme(),
    scanEgrn: mixed().when('opfType', {
        is: OpfType.INDIVIDUAL,
        then: () => fileCheckScheme(),
    }),
    scanContract: mixed().when(['opfType', 'hasContract'], {
        is: (opfType, hasContract) => opfType === OpfType.INDIVIDUAL && !hasContract,
        then: () => fileCheckScheme(),
    }),
});
