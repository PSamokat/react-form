import { SchemaObject } from 'src/common/types/common';
import { OpfType } from 'src/common/types/customer';
import { fileCheckSchema, innCheckSchema, ogrnCheckScheme } from 'src/common/utils/yup-schemas';
import { OwnershipTypeFieldModel } from 'src/forms/ownership-type/form-model';
import {
    boolean, date, mixed, object, string,
} from 'yup';

export const ownershipScheme = object().shape<SchemaObject<OwnershipTypeFieldModel>>({
    opfType: string().required('Выберите форму'),
    inn: innCheckSchema(),
    ogrn: ogrnCheckScheme(),
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
    scanInn: fileCheckSchema(),
    scanOgrn: fileCheckSchema(),
    scanEgrn: mixed().when('opfType', {
        is: OpfType.INDIVIDUAL,
        then: () => fileCheckSchema(),
    }),
    scanContract: mixed().when(['opfType', 'hasContract'], {
        is: (opfType, hasContract) => opfType === OpfType.INDIVIDUAL && !hasContract,
        then: () => fileCheckSchema(),
    }),
});
