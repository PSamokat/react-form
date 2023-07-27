import { DaDataAddress, DaDataCountries, FieldWithDaData } from 'src/common/types/dadata';

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
    uploadedDocuments: UploadedDocumentInfo[];
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

export interface SocialInfo {
    platformName: string;
    url: string;
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum OpfType {
    INDIVIDUAL = 'INDIVIDUAL',
    LEGAL = 'LEGAL',
}
export enum ValidationStatus {
    VALID = 'valid',
    INVALID = 'invalid',
    NOT_STARTED = 'not_started',
}
export interface UploadedDocumentInfo {
    fieldName: string;
    file: File;
}

export interface DocumentTypeInfo {
    code: string;
    name: string;
}
export enum AcceptedDocumentType {
    PDF,
    JPEG,
    BMP,
    PNG,
}
export function getDocumentTypeInfo(type: AcceptedDocumentType): DocumentTypeInfo {
    switch (type) {
        case AcceptedDocumentType.BMP:
            return { name: '.bmp', code: 'image/bmp' };
        case AcceptedDocumentType.JPEG:
            return { name: '.jpeg', code: 'image/jpeg' };
        case AcceptedDocumentType.PDF:
            return { name: '.pdf', code: 'application/pdf' };
        case AcceptedDocumentType.PNG:
            return { name: '.png', code: 'image/png' };
        default:
            return { name: 'image', code: 'image/*' };
    }
}
