import dayjs from 'dayjs';
import { CustomerInfo } from 'Src/common/types/customer';
import { OwnershipTypeFieldModel } from 'Src/forms/ownership-type/form-model';

export function convertToInitialValues(data: CustomerInfo): OwnershipTypeFieldModel {
    const { legalInfo, uploadedDocuments } = data;
    const {
        inn, ogrn, opfType, registrationDate, hasContract, fullName, shortName,
    } = legalInfo;

    return {
        inn,
        ogrn,
        opfType,
        registrationDate: dayjs(registrationDate),
        hasContract,
        fullName,
        shortName,
        uploadedDocuments,
    };
}
