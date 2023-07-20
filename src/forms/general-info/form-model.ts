import { Dayjs } from 'dayjs';
import type { Gender } from 'src/common/types/customer';
import { DaDataAddress, DaDataCountries, FieldWithDaData } from 'Src/common/types/dadata';

export interface GeneralInfoFieldsModel {
    firstName?: string;
    surName?: string;
    lastName?: string;
    city?: FieldWithDaData<DaDataAddress>;
    citizenship?: FieldWithDaData<DaDataCountries>;
    gender?: Gender;
    birthDate?: Dayjs;
    birthPlace?: string;
}
