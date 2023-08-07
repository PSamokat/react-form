import { FieldWithDaData } from 'src/common/types/common';
import { DaDataAddress, DaDataCountries } from 'src/common/types/dadata';

export interface CustomerInfo {
    personInfo: {
        firstName?: string;
        surName?: string;
        lastName?: string;
        city?: FieldWithDaData<DaDataAddress>;
        citizenship?: FieldWithDaData<DaDataCountries>;
        gender?: Gender;
        birthDate?: number;
        birthPlace?: string;
        registration?: CustomerAddress;
        residential?: Omit<CustomerAddress, 'registrationDate'>;
        addressMatches?: boolean;
        socials?: SocialInfo[];
    };
    legalInfo: {
        shortName?: string;
        fullName?: string;
        opfType?: OpfType;
        inn?: string;
        ogrn?: string;
        registrationDate?: number;
        hasContract?: boolean;
    };
    uploadedDocuments: CustomerDocuments;
}

export interface CustomerAddress {
    country?: FieldWithDaData<DaDataCountries>;
    region?: FieldWithDaData<DaDataAddress>;
    city?: FieldWithDaData<DaDataAddress>;
    street?: FieldWithDaData<DaDataAddress>;
    house?: FieldWithDaData<DaDataAddress>;
    apartment?: string;
    hasNoApartment?: boolean;
    registrationDate?: number;
}

export type CustomerDocuments = Partial<Record<RegistrationDocuments, File[]>>;

export interface SocialInfo {
    platformName?: string;
    url?: string;
}
export enum RegistrationDocuments {
    INN = 'inn',
    OGRN = 'ogrn',
    EGRN = 'egrn',
    CONTRACT = 'contract',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum OpfType {
    INDIVIDUAL = 'INDIVIDUAL',
    LEGAL = 'LEGAL',
}
