import { createSlice } from '@reduxjs/toolkit';
import { CustomerInfo, ValidationStatus } from 'src/common/types/customer';

const initialState: CustomerInfo = {
    personInfo: {
        firstName: '',
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
    legalInfo: {},
    documentsValidationStatus: ValidationStatus.NOT_STARTED,
};

const formReducer = createSlice({
    name: 'form',
    initialState,
    reducers: {},
});

export default formReducer.reducer;
