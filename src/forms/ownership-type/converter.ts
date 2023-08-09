import dayjs from 'dayjs';
import omit from 'lodash/omit';
import { CustomerInfo } from 'Src/common/types/customer';
import { OwnershipTypeFieldModel } from 'Src/forms/ownership-type/form-model';

export const convertToInitialValues: (data: CustomerInfo) => OwnershipTypeFieldModel = (data) => {
    const { legalInfo, uploadedDocuments } = data;
    const {
        inn, ogrn, opfType, registrationDate, hasContract, fullName, shortName,
    } = legalInfo;
    const {
        inn: scanInn,
        egrn: scanEgrn,
        contract: scanContract,
        ogrn: scanOgrn,
    } = uploadedDocuments;

    return {
        inn,
        ogrn,
        opfType,
        registrationDate: registrationDate ? dayjs(registrationDate) : null,
        hasContract: typeof hasContract === 'undefined' ? false : !hasContract,
        fullName,
        shortName,
        scanInn,
        scanOgrn,
        scanContract,
        scanEgrn,
    };
};

export const convertToStoreValue: (data: OwnershipTypeFieldModel) => Partial<CustomerInfo> = (
    data,
) => ({
    uploadedDocuments: {
        inn: data.scanInn,
        ogrn: data.scanOgrn,
        egrn: data.scanEgrn,
        contract: data.scanContract,
    },
    legalInfo: {
        ...omit(data, ['scanInn', 'scanOgrn', 'scanEgrn', 'scanContract']),
        registrationDate: data.registrationDate.valueOf(),
        hasContract: !data.hasContract,
    },
});
