import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerInfo, ValidationStatus } from 'src/common/types/customer';
import { GeneralInfoFieldsModel } from 'src/forms/general-info/form-model';
import { OwnershipTypeFieldModel } from 'src/forms/ownership-type/form-model';
import { RegistrationAddressFieldsModel } from 'Src/forms/registration-address/form-model';

const initialState: CustomerInfo = {
    personInfo: {
        firstName: undefined,
        gender: undefined,
        city: undefined,
        citizenship: undefined,
        birthDate: undefined,
        birthPlace: undefined,
        lastName: undefined,
        surName: undefined,
        registration: {
            country: undefined,
            region: undefined,
            city: undefined,
            street: undefined,
            house: undefined,
            apartment: undefined,
            hasNoApartment: undefined,
            registrationDate: undefined,
        },
        socials: undefined,
        residential: {
            country: undefined,
            region: undefined,
            city: undefined,
            street: undefined,
            house: undefined,
            apartment: undefined,
            hasNoApartment: undefined,
        },
    },
    legalInfo: {
        hasContract: false,
        inn: undefined,
        registrationDate: undefined,
        opfType: undefined,
        ogrn: undefined,
        fullName: undefined,
        shortName: undefined,
    },
    documentsValidationStatus: ValidationStatus.NOT_STARTED,
};

const formReducer = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setGeneralInfo(state: CustomerInfo, action: PayloadAction<GeneralInfoFieldsModel>) {
            state.personInfo = { ...action.payload, birthDate: action.payload.birthDate.valueOf() };
        },
        setOwnershipInfo(state: CustomerInfo, action: PayloadAction<OwnershipTypeFieldModel>) {
            state.legalInfo = { ...action.payload, registrationDate: action.payload.registrationDate.valueOf() };
        },
        setRegistrationAddress(state: CustomerInfo, action: PayloadAction<RegistrationAddressFieldsModel>) {
            state.personInfo.registration = { ...action.payload, registrationDate: action.payload.registrationDate.valueOf() };
        },
    },
});

export const formActions = formReducer.actions;

export default formReducer.reducer;
