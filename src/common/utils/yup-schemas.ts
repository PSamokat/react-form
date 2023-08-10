import { FieldWithDaData } from 'src/common/types/common';
import { OpfType } from 'src/common/types/customer';
import { DaDataAddress, DaDataCountries } from 'src/common/types/dadata';
import { formatSize } from 'src/common/utils/common';
import { isValidINN } from 'src/common/utils/inn-verifier';
import { isValidOGRN } from 'src/common/utils/ogrn-verifier';
import {
    mixed, MixedSchema, string, StringSchema,
} from 'yup';

type TypeAddressCheckerFn = (dadataField: FieldWithDaData<DaDataAddress>) => {
    path: keyof FieldWithDaData<DaDataAddress>;
    message: string;
};
type TypeCountryCheckerFn = (dadataField: FieldWithDaData<DaDataCountries>) => {
    path: keyof FieldWithDaData<DaDataCountries>;
    message: string;
};

const AddressChecker: Record<
    'getAddressSelectionError' | 'getBasicFieldsExistenceError',
    TypeAddressCheckerFn
> = {
    getBasicFieldsExistenceError: (dadataField) => {
        if (!dadataField.value || dadataField.value.length === 0) {
            return {
                path: 'value',
                message: 'Введите адресс и выберете из списка',
            };
        }

        return null;
    },
    getAddressSelectionError: (dadataField) => {
        if (!dadataField) {
            return {
                path: 'dadataObj',
                message: 'Заполните поле',
            };
        }

        if (!dadataField.dadataObj) {
            return {
                path: 'dadataObj',
                message: 'Выберите адрес из списка',
            };
        }
        const addressExist = Boolean(dadataField.dadataObj.fias_id);

        if (!addressExist) {
            return {
                path: 'dadataObj',
                message: 'Такого адресса не существует',
            };
        }

        return null;
    },
};

const CountryChecker: Record<
    'getCountrySelectionError' | 'getBasicFieldsExistenceError',
    TypeCountryCheckerFn
> = {
    getBasicFieldsExistenceError: (dadataField) => {
        if (!dadataField.value || dadataField.value.length === 0) {
            return {
                path: 'value',
                message: 'Введите страну и выберете из списка',
            };
        }

        return null;
    },

    getCountrySelectionError: (dadataField) => {
        if (!dadataField) {
            return {
                path: 'dadataObj',
                message: 'Заполните поле',
            };
        }
        if (!dadataField.dadataObj) {
            return {
                path: 'dadataObj',
                message: 'Выберите стрну из списка',
            };
        }
        const nameExist = Boolean(dadataField.dadataObj.name);
        const codeExist = Boolean(dadataField.dadataObj.code);

        if (!nameExist && !codeExist) {
            return {
                path: 'dadataObj',
                message: 'Такой страны не существует',
            };
        }

        return null;
    },
};

export const dadataAddressSchema: (
    message?: string
) => MixedSchema<FieldWithDaData<DaDataAddress>> = (message = 'Введите адресс') =>
    mixed<FieldWithDaData<DaDataAddress>>().test('dadata test', message, (field, context) => {
        const addressSelectionError = AddressChecker.getAddressSelectionError(field);

        if (addressSelectionError) {
            return context.createError({
                path: context.path,
                message: addressSelectionError.message,
            });
        }

        const basicFieldsExistenceError = AddressChecker.getBasicFieldsExistenceError(field);

        if (basicFieldsExistenceError) {
            return context.createError({
                path: context.path,
                message: basicFieldsExistenceError.message,
            });
        }

        return true;
    });

export const dadataCountrySchema: (
    message?: string
) => MixedSchema<FieldWithDaData<DaDataCountries>> = (message = 'Введите страну') =>
    mixed<FieldWithDaData<DaDataCountries>>().test('dadata test', message, (field, context) => {
        const countrySelectionError = CountryChecker.getCountrySelectionError(field);

        if (countrySelectionError) {
            return context.createError({
                path: context.path,
                message: countrySelectionError.message,
            });
        }
        const basicFieldsExistenceError = CountryChecker.getBasicFieldsExistenceError(field);

        if (basicFieldsExistenceError) {
            return context.createError({
                path: context.path,
                message: basicFieldsExistenceError.message,
            });
        }

        return true;
    });

export const fileCheckSchema: (size?: number, message?: string) => MixedSchema<File[]> = (
    size = 5 * 1024 * 1024,
    message = 'Прикрепите файл',
) =>
    mixed<File[]>().test('file check', message, (files, context) => {
        if (!files || files.length < 1) {
            return context.createError({
                path: context.path,
                message: 'Прикрепите файл' || message,
            });
        }

        const isBigSumSize =
            files.reduce((sumSize, currentFile) => sumSize + currentFile.size, 0) > size;

        if (isBigSumSize) {
            return context.createError({
                path: context.path,
                message: `Размер не должен первышать ${formatSize(size)}` || message,
            });
        }

        const isZeroSize = files.every((file) => file.size === 0);

        if (isZeroSize) {
            return context.createError({
                path: context.path,
                message: 'Размер файла не может быть нулевым' || message,
            });
        }
        const isSameName = [...new Set(files.map((file) => file.name))].length !== files.length;

        if (isSameName) {
            return context.createError({
                path: context.path,
                message: 'Файлы не должны иметь одинаковых имен' || message,
            });
        }

        return true;
    });

export const innCheckSchema: (
    messageForIndividual?: string,
    messageForOthers?: string
) => StringSchema = (
    messageForIndividual = 'Необходимо 12 цифр',
    messageForOthers = 'Необходимо 10 цифр',
) =>
    string()
        .required('Обязательное поле')
        .when('opfType', {
            is: OpfType.INDIVIDUAL,
            then: (schema) =>
                schema
                    .min(12, messageForIndividual)
                    .max(12, messageForIndividual)
                    .test('inn-sum', 'Некорректный ИНН', (value) => value && isValidINN(value)),
            otherwise: (schema) =>
                schema
                    .min(10, messageForOthers)
                    .max(10, messageForOthers)
                    .test('inn-sum', 'Некорректный ИНН', (value) => value && isValidINN(value)),
        });

export const ogrnCheckScheme: (
    messageForIndividual?: string,
    messageForOthers?: string
) => StringSchema = (
    messageForIndividual = 'Необходимо 15 цифр',
    messageForOthers = 'Необходимо 13 цифр',
) =>
    string()
        .required('Обязательное поле')
        .when('opfType', {
            is: OpfType.INDIVIDUAL,
            then: (schema) =>
                schema
                    .min(15, messageForIndividual)
                    .max(15, messageForIndividual)
                    .test('inn-sum', 'Некорректный ОГРНИП', (value) => value && isValidOGRN(value)),
            otherwise: (schema) =>
                schema
                    .min(13, messageForOthers)
                    .max(13, messageForOthers)
                    .test('inn-sum', 'Некорректный ОГРН', (value) => value && isValidOGRN(value)),
        });
