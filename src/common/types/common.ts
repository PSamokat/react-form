import { DefaultOptionType } from 'rc-select/lib/Select';
import { Schema } from 'yup';

export type SchemaObject<T> = {
    [key in keyof T]: Schema;
};

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

export interface DaDataSelectOption<T> extends DefaultOptionType{
    value: string;
    label: string;
    title: string;
    data: T;
}

export interface FieldWithDaData<T> {
    value: string;
    dadataObj: T;
}
