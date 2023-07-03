import type React from 'react';

import GeneralInfo from './general-info';
import OwnershipType from './ownership-type';
import RegistrationAddress from './registration-address';
import ResidentialAddress from './residential-address';
import SocialMedias from './social-medias';

export enum FormRoutes {
    GENERAL = '/general',
    OWNERSHIP = '/ownership',
    REGISTRATION = '/registration-address',
    RESIDENTIAL = '/residential-address',
    SOCIALS = '/socials',
}
export const routeToComponentRelation: Record<FormRoutes, React.FC> = {
    [FormRoutes.GENERAL]: GeneralInfo,
    [FormRoutes.OWNERSHIP]: OwnershipType,
    [FormRoutes.REGISTRATION]: RegistrationAddress,
    [FormRoutes.RESIDENTIAL]: ResidentialAddress,
    [FormRoutes.SOCIALS]: SocialMedias,
};
