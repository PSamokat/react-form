import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerInfo, OpfType, ValidationStatus } from 'src/common/types/customer';
import { DaDataParty } from 'Src/common/types/dadata';
import { GeneralInfoFieldsModel } from 'Src/forms/general-info/form-model';
import { OwnershipTypeFieldModel } from 'Src/forms/ownership-type/form-model';

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
        registration: undefined,
        socials: undefined,
        residential: undefined,
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
        setLegalInfoSuggest(state: CustomerInfo, action: PayloadAction<DaDataParty>) {
            state.legalInfo.opfType = OpfType.LEGAL;
            state.legalInfo.inn = action.payload?.inn;
            state.legalInfo.ogrn = action.payload?.ogrn;
            state.legalInfo.shortName = action.payload?.name.short_with_opf;
            state.legalInfo.fullName = action.payload?.name.full_with_opf;
            state.legalInfo.registrationDate = action.payload?.state.registration_date;
        },
    },
});

export const formActions = formReducer.actions;

export default formReducer.reducer;
