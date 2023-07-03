import { Dayjs } from 'dayjs';
import type { Gender } from 'Src/common/types/customer';

export interface GeneralInfoFieldsModel {
    firstName?: string;
    surName?: string;
    lastName?: string;
    city?: string;
    citizenship?: string;
    gender?: Gender;
    birthDate?: Dayjs;
    birthPlace?: string;
}
