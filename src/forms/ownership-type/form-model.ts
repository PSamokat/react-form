import { Dayjs } from 'dayjs';
import { OpfType, UploadedDocumentInfo } from 'src/common/types/customer';

export interface OwnershipTypeFieldModel {
    opfType?: OpfType;
    inn: string;
    ogrn?: string;
    registrationDate?: Dayjs;
    hasContract?: boolean;
    fullName: string;
    shortName: string;
    uploadedDocuments: UploadedDocumentInfo[];
}
