import { Dayjs } from 'dayjs';

export interface CustomerInfo {
    personInfo: {
        firstName?: string;
        surName?: string;
        lastName?: string;
        city?: string;
        citizenship?: string;
        gender?: Gender;
        birthDate?: Dayjs;
        birthPlace?: string;
        registration?: Record<string, unknown>;
        residential?: Record<string, unknown>;
        socials?: [];
    };
    legalInfo: {
        opfType?: OpfType;
        inn?: string;
        ogrn?: string;
        registrationDate?: string;
        hasContract?: boolean;
    };
    documentsValidationStatus: ValidationStatus;
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum OpfType {
    INDIVIDUAL = 'individual',
    LEGAL = 'legal',
}
export enum ValidationStatus {
    VALID = 'valid',
    INVALID = 'invalid',
    NOT_STARTED = 'not_started',
}
