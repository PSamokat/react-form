export interface CustomerInfo {
    personInfo: {
        firstName?: string;
        surName?: string;
        lastName?: string;
        city?: string;
        citizenship?: string;
        gender?: Gender;
        birthDate?: number;
        birthPlace?: string;
        registration?: CustomerAddress;
        residential?: Omit<CustomerAddress, 'registrationDate'>;
        socials?: [];
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
    documentsValidationStatus: ValidationStatus;
}

export interface AddressData {
    name?: string;
    fiasId?: string;
}

export interface CountryData {
    name: string;
    code: string;
}

export interface CustomerAddress {
    country?: {
        name?: string;
        value?: string;
    };
    region?: AddressData;
    city?: AddressData;
    street?: AddressData;
    house?: AddressData;
    apartment?: AddressData;
    hasNoApartment?: boolean;
    registrationDate?: string;
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
