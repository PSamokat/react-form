/*
import { DaDataAddress, DaDataCountries, FieldWithDaData } from 'src/common/types/dadata';
*/
import { mixed } from 'yup';

/*
const DADATA_PROPERTY_KEY: keyof FieldWithDaData<DaDataAddress | DaDataCountries> = 'dadataObj';
*/

/* type TypeAddressCheckerFn = (dadataField: FieldWithDaData<DaDataAddress>) => {
    path: keyof FieldWithDaData<DaDataAddress>;
    message: string;
};
type TypeCountryCheckerFn = (dadataField: FieldWithDaData<DaDataCountries>) => {
    path: keyof FieldWithDaData<DaDataCountries>;
    message: string;
}; */

const AddressChecker/* : Record<
    'getAddressSelectionError' | 'getBasicFieldsExistenceError',
    TypeAddressCheckerFn
> */ = {
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

const CountryChecker/* : Record<
    'getCountrySelectionError' | 'getBasicFieldsExistenceError',
    TypeCountryCheckerFn
> */ = {
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

export function dadataAddressScheme(
    message = 'Введите адресс',
) {
    return mixed().test(
        'dadata test',
        message,
        function test(this, field) {
            const addressSelectionError = AddressChecker.getAddressSelectionError(field);

            if (addressSelectionError) {
                return this.createError({
                    path: this.path,
                    message: addressSelectionError.message,
                });
            }

            const basicFieldsExistenceError = AddressChecker.getBasicFieldsExistenceError(field);

            if (basicFieldsExistenceError) {
                return this.createError({
                    path: this.path,
                    message: basicFieldsExistenceError.message,
                });
            }

            return true;
        },
    );
}

export function dadataCountryScheme(
    message = 'Введите страну',
) {
    return mixed().test(
        'dadata test',
        message,
        function test(this, field) {
            const countrySelectionError = CountryChecker.getCountrySelectionError(field);

            if (countrySelectionError) {
                return this.createError({
                    path: this.path,
                    message: countrySelectionError.message,
                });
            }
            const basicFieldsExistenceError = CountryChecker.getBasicFieldsExistenceError(field);

            if (basicFieldsExistenceError) {
                return this.createError({
                    path: this.path,
                    message: basicFieldsExistenceError.message,
                });
            }

            return true;
        },
    );
}
