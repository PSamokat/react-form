import dayjs from 'dayjs';
import type { CustomerInfo } from 'Src/common/types/customer';

import type { GeneralInfoFieldsModel } from './form-model';

export function convertToInitialValues(data: CustomerInfo): GeneralInfoFieldsModel {
    const { personInfo } = data;
    const {
        firstName, surName, lastName, birthPlace, birthDate, city, gender, citizenship,
    } =
        personInfo;

    return {
        firstName,
        surName,
        lastName,
        city,
        citizenship,
        gender,
        birthDate: dayjs(birthDate),
        birthPlace,
    };
}
