import dayjs from 'dayjs';
import type { CustomerInfo } from 'Src/common/types/customer';

import type { GeneralInfoFieldsModel } from './form-model';

export const convertToInitialValues: (data: CustomerInfo) => GeneralInfoFieldsModel = (data) => {
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
};

export const convertToStoreValue: (data: GeneralInfoFieldsModel) => Partial<CustomerInfo> = (
    data,
) => ({
    personInfo: {
        ...data,
        birthDate: data.birthDate.valueOf(),
    },
});
