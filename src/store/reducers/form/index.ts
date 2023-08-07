import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import { CustomerInfo } from 'src/common/types/customer';
import { GeneralInfoFieldsModel } from 'src/forms/general-info/form-model';
import { RegistrationAddressFieldsModel } from 'Src/forms/registration-address/form-model';
import { ResidentialAddressFieldsModel } from 'Src/forms/residential-address/form-model';
import { SocialMediasFieldsModel } from 'Src/forms/social-medias/form-model';

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
        socials: [{
            platformName: undefined,
            url: undefined,
        }],
        residential: {
            country: undefined,
            region: undefined,
            city: undefined,
            street: undefined,
            house: undefined,
            apartment: undefined,
            hasNoApartment: undefined,
        },
        addressMatches: false,
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
    uploadedDocuments: {
        inn: undefined,
        contract: undefined,
        ogrn: undefined,
        egrn: undefined,
    },
};

const formReducer = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setGeneralInfo(state: CustomerInfo, action: PayloadAction<GeneralInfoFieldsModel>) {
            state.personInfo = { ...action.payload, birthDate: action.payload.birthDate.valueOf() };
        },
        setOwnershipInfo(state: CustomerInfo, action: PayloadAction<Partial<CustomerInfo>>) {
            state.legalInfo = action.payload.legalInfo;
            state.uploadedDocuments = action.payload.uploadedDocuments;
        },
        setRegistrationAddress(state: CustomerInfo, action: PayloadAction<RegistrationAddressFieldsModel>) {
            state.personInfo.registration = { ...action.payload, registrationDate: action.payload.registrationDate.valueOf() };
        },
        setResidentialAddress(state: CustomerInfo, action: PayloadAction<ResidentialAddressFieldsModel>) {
            state.personInfo.residential = action.payload;
        },
        setAddressMatches(state: CustomerInfo) {
            state.personInfo.residential = omit(state.personInfo.registration, 'registrationDate');
        },
        setSocialMedia(state: CustomerInfo, action: PayloadAction<SocialMediasFieldsModel>) {
            state.personInfo.socials = action.payload.socials;
        },
        sendForm() {},
    },
});

export const formActions = formReducer.actions;

export default formReducer.reducer;
