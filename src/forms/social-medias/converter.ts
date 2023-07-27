import { CustomerInfo } from 'Src/common/types/customer';
import { SocialMediasFieldsModel } from 'Src/forms/social-medias/form-model';

export function convertToInitialValues(data: CustomerInfo): SocialMediasFieldsModel {
    const { personInfo } = data;

    const { socials } = personInfo;

    return {
        socials,
    };
}
