import { Dayjs } from 'dayjs';
import { OpfType } from 'Src/common/types/customer';

export interface OwnershipTypeFieldModel {
    opfType?: OpfType;
    inn: string;
    ogrn?: string;
    registrationDate?: Dayjs;
    hasContract?: boolean;
    fullName: string;
    shortName: string;
}
